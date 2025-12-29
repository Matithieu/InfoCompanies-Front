import { paths } from '@/types/codegen/api'
import { ChatStreamResponse } from '@/types/index.types'
import { asserts, NNU } from '@/utils/assertion.util'
import { useCallback, useEffect, useRef, useState } from 'react'

type UseStreamAIProps = {
  url: keyof paths
  parameters?: {
    pathVariable?: Record<string, string>
  }
}

type UseStreamAIReturn = {
  response: string
  isLoading: boolean
  error: Error | null
  conversationId?: string
  streamAI: (userInput: string) => Promise<void>
  cancel: () => void
}

export function useStreamAI({
  url: receivedUrl,
  parameters,
}: UseStreamAIProps): UseStreamAIReturn {
  const baseUrl = import.meta.env.VITE_API_PREFIX ?? '/api'

  const [conversationId, setConversationId] = useState<string>()
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const conversationIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    conversationIdRef.current = conversationId
  }, [conversationId])

  const buildUrl = useCallback(() => {
    let endpoint = `${baseUrl}${receivedUrl}`

    // Replace path variables
    if (parameters?.pathVariable) {
      for (const [key, value] of Object.entries(parameters.pathVariable)) {
        endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(value))
      }
    }

    return endpoint
  }, [baseUrl, receivedUrl, parameters])

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
    setIsLoading(false)
  }, [])

  const streamAI = useCallback(
    async (userInput: string) => {
      setIsLoading(true)
      setResponse('')
      setError(null)

      abortControllerRef.current?.abort()
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      const endpoint = buildUrl()

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({ userInput }),
          signal: abortController.signal,
        })

        const contentType = response.headers.get('content-type') ?? ''

        if (!contentType.includes('text/event-stream')) {
          // The backend isn't actually streaming SSE
          asserts(false, `Expected SSE but got: ${contentType}`)
        }

        const reader = NNU(response.body?.getReader(), 'Response body is null')
        const decoder = new TextDecoder('utf-8')

        let buffer = ''
        let fullText = ''

        const handleEventBlock = (block: string) => {
          // With SSE, every block starts with "data: "
          const data = block.slice('data:'.length)
          if (!data) return

          const chunk = JSON.parse(data) as ChatStreamResponse

          fullText += chunk.chatResponse.result.output.text
          setResponse(fullText)

          const conversationId = chunk.conversationId

          if (!conversationIdRef.current && conversationId) {
            conversationIdRef.current = conversationId
            setConversationId(conversationId)
          }
        }

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // This is important. Won't work without it.
          let index: number

          while ((index = buffer.indexOf('\n\n')) !== -1) {
            const eventBlock = buffer.slice(0, index)
            buffer = buffer.slice(index + 2)
            handleEventBlock(eventBlock)
          }
        }

        // Flush any remaining decoder bytes
        buffer += decoder.decode()

        // Handle last block if it ends without \n\n (some servers do that)
        if (buffer.trim()) handleEventBlock(buffer)

        setIsLoading(false)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error('Unknown error'))
        setIsLoading(false)
      }
    },
    [buildUrl],
  )

  useEffect(() => {
    return () => abortControllerRef.current?.abort()
  }, [])

  return { response, isLoading, error, conversationId, streamAI, cancel }
}
