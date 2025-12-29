import AiBody from '@/components/parts/AI/components/AiBody/AiBody'
import AiFooter from '@/components/parts/AI/components/AiFooter'
import ConversationHistory from '@/components/parts/AI/components/ConversationHistory/ConversationHistory'
import { useStreamAI } from '@/hooks/useStreamAI'
import { MessageHistory } from '@/types/index.types'
import {
  fetchAllConversationsHistory,
  fetchCurrentConversationHistory,
} from '@/utils/api/queries'
import { isNotNU } from '@/utils/assertion.util'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useRef, useState } from 'react'

const newConversationId = 'newConversation'

const Test: FC = () => {
  const conversationContainerRef = useRef<HTMLDivElement>(null)

  /** Adds a slight delay to ensure the DOM has updated before scrolling */
  const scrollToBottom = () => {
    setTimeout(() => {
      if (conversationContainerRef.current) {
        conversationContainerRef.current.scrollTo({
          top: conversationContainerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  const [userInput, setUserInput] = useState<string | undefined>()
  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('conversationId') ?? undefined
  })
  const [currentConversation, setCurrentConversation] = useState<
    Array<MessageHistory> | undefined
  >(undefined)

  const {
    data: conversationHistoryData,
    isLoading: isConversationHistoryLoading,
  } = useQuery({
    queryKey: ['conversationsHistory'],
    queryFn: () => fetchAllConversationsHistory(),
  })

  const {
    data: currentConversationData,
    isError: isCurrentConversationError,
    isLoading: isCurrentConversationLoading,
  } = useQuery({
    queryKey: ['conversation', currentConversationId],
    queryFn: () => fetchCurrentConversationHistory(currentConversationId!),
    enabled: isNotNU(currentConversationId),
  })

  useEffect(() => {
    // Handle conversation fetch error (e.g., invalid conversationId)
    if (isCurrentConversationError) {
      setCurrentConversation([])
      window.location.search = ''
      return
    }

    if (currentConversationData) {
      setCurrentConversation(currentConversationData)
    }

    if (!isCurrentConversationLoading && isNotNU(currentConversationData)) {
      scrollToBottom()
    }
  }, [
    currentConversationData,
    isCurrentConversationError,
    isCurrentConversationLoading,
  ])

  const {
    response,
    isLoading,
    conversationId: responseConversationId,
    streamAI,
    cancel,
  } = useStreamAI({
    url: '/v1/chat/conversation/{conversationId}',
    parameters: {
      pathVariable: {
        conversationId: isNotNU(currentConversationId)
          ? currentConversationId
          : 'new',
      },
    },
  })

  useEffect(() => {
    if (isNotNU(responseConversationId) && !isLoading) {
      setCurrentConversationId(responseConversationId)

      // Handle updating the URL with the conversationId only if not already present
      if (
        !window.location.search.includes('conversationId=') &&
        !isCurrentConversationError
      ) {
        const newUrl = `${window.location.pathname}?conversationId=${responseConversationId}`
        window.history.replaceState(null, '', newUrl)
      }
    }

    // Handle streaming response update in the conversation
    if (isLoading) {
      const newMessage = {
        message: response,
        messageType: 'ASSISTANT',
        timestamp: new Date().toISOString(),
      } satisfies MessageHistory

      setCurrentConversation((prev) => {
        if (isNotNU(prev)) {
          const lastMessage = prev[prev.length - 1]

          if (lastMessage?.messageType === 'USER') return [...prev, newMessage]
          return [...prev.slice(0, -1), newMessage]
        }
      })
    }
  }, [
    currentConversationId,
    isCurrentConversationError,
    isLoading,
    response,
    responseConversationId,
  ])

  const handleSubmit = () => {
    setCurrentConversation((prev) => {
      const newUserMessage = {
        message: userInput ?? '',
        messageType: 'USER',
        timestamp: new Date().toISOString(),
      } satisfies MessageHistory

      return isNotNU(prev) ? [...prev, newUserMessage] : [newUserMessage]
    })
    streamAI(userInput ?? '')
    scrollToBottom()
  }

  const handleSelectConversation = (conversationId: string) => {
    if (conversationId === newConversationId) {
      // New conversation
      setCurrentConversationId(undefined)
      setCurrentConversation(undefined)
      window.history.replaceState(null, '', window.location.pathname)
      scrollToBottom()
    } else {
      setCurrentConversationId(conversationId)
      const newUrl = `${window.location.pathname}?conversationId=${conversationId}`
      window.history.replaceState(null, '', newUrl)
      scrollToBottom()
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <ConversationHistory
          conversations={conversationHistoryData}
          isLoading={isConversationHistoryLoading}
          onNewConversation={() => handleSelectConversation(newConversationId)}
          onSelectConversation={handleSelectConversation}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            height: 'calc(100vh - 40px)',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <div
            ref={conversationContainerRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 10,
            }}
          >
            <AiBody messages={currentConversation} />
          </div>

          <div
            style={{
              paddingTop: '10px',
              paddingBottom: '20px',
              padding: '10px',
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <AiFooter
              cancel={cancel}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              setUserInput={setUserInput}
              value={userInput}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Test
