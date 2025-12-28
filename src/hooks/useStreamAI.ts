import { paths } from '@/types/codegen/api'
import { handleStream } from '@/utils/api/network/handleStream'
import { useCallback, useEffect, useRef, useState } from 'react'

type UseStreamAIProps = {
  url: keyof paths
}

type UseStreamAIReturn = {
  response: string
  loading: boolean
  error: Error | null
  streamAI: (userInput: string) => void
  cancel: () => void
  reset: () => void
}

export function useStreamAI({
  url: receivedUrl,
}: UseStreamAIProps): UseStreamAIReturn {
  const baseUrl = import.meta.env.VITE_API_PREFIX ?? '/api'
  const url = baseUrl + receivedUrl

  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const streamAI = useCallback(
    (userInput: string) => {
      setLoading(true)
      setResponse('')
      setError(null)

      cleanupRef.current = handleStream({
        url,
        params: { userInput },
        onChunk: (_chunk, fullText) => {
          setResponse(fullText)
        },
        onComplete: () => {
          setLoading(false)
        },
        onError: (err) => {
          setError(err)
          setLoading(false)
        },
      })
    },
    [url],
  )

  const cancel = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    cancel()
    setResponse('')
    setError(null)
  }, [cancel])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupRef.current?.()
    }
  }, [])

  return { response, loading, error, streamAI, cancel, reset }
}
