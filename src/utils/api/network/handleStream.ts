import { ChatResponse } from '@/types/index.types'

export interface StreamHandlerOptions {
  url: string
  params: Record<string, string>
  onChunk?: (chunk: string, fullText: string) => void
  onComplete?: (fullText: string) => void
  onError?: (error: Error) => void
}

export function handleStream({
  url,
  params,
  onChunk,
  onComplete,
  onError,
}: StreamHandlerOptions): () => void {
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = `${url}?${queryString}`

  let eventSource: EventSource | null = null
  let fullText = ''

  try {
    eventSource = new EventSource(fullUrl)

    eventSource.onmessage = (event: MessageEvent) => {
      const chunk = JSON.parse(event.data) as ChatResponse
      const isChatEnded = chunk.result.metadata.finishReason === 'STOP'
      fullText += chunk.result.output.text
      onChunk?.(chunk.result.output.text, fullText)

      if (isChatEnded) {
        eventSource?.close()
        onComplete?.(fullText)
      }
    }

    eventSource.onerror = (_event) => {
      const error = new Error('Stream connection failed')
      console.error('Stream error:', error)

      onError?.(error)
      eventSource?.close()
      onComplete?.(fullText)
    }
  } catch (error) {
    onError?.(error as Error)
  }

  // Return cleanup function
  return () => {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
  }
}
