import AiConversationHistory from '@/pages/Ai/components/AiConversationHistory/AiConversationHistory'
import AiInput from '@/pages/Ai/components/AiInput'
import AiMessages from '@/pages/Ai/components/AiMessages/AiMessages'
import { MessageHistory } from '@/types/index.types'
import { isNotNullOrUndefined, isNullOrUndefined } from '@/utils/assertion.util'
import { FC, useEffect, useRef, useState } from 'react'

import { scrollToBottomUtil } from './Ai.utils'
import {
  useAiConversationStream,
  useConversationsHistoryQuery,
  useCurrentConversationQuery,
  useDeleteConversationMutation,
} from './hooks/useAiQueries'

const Ai: FC = () => {
  const conversationContainerRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => scrollToBottomUtil(conversationContainerRef)
  const [currentConversation, setCurrentConversation] = useState<
    Array<MessageHistory> | undefined
  >(undefined)

  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >(() => {
    return (
      new URLSearchParams(window.location.search).get('conversationId') ||
      undefined
    )
  })
  const {
    data: conversationHistoryData,
    isLoading: isConversationHistoryLoading,
  } = useConversationsHistoryQuery()

  const {
    data: currentConversationData,
    isError: isCurrentConversationError,
    isLoading: isCurrentConversationLoading,
  } = useCurrentConversationQuery(currentConversationId)

  const {
    streamAiResponse,
    isLoading: isConversationStreamLoading,
    conversationId: responseConversationId,
    streamAi,
    cancelStreamAi,
  } = useAiConversationStream(currentConversationId)

  const deleteConversationMutation = useDeleteConversationMutation({
    conversationHistoryData,
    currentConversationId,
    setCurrentConversation,
    setCurrentConversationId,
  })

  // Synchronize the current conversation messages
  useEffect(() => {
    // Handle invalid conversation id
    if (isCurrentConversationError) {
      setCurrentConversation([])
      window.location.search = ''
      return
    }

    if (currentConversationData) setCurrentConversation(currentConversationData)

    if (
      !isCurrentConversationLoading &&
      isNotNullOrUndefined(currentConversationData)
    ) {
      scrollToBottom()
    }
  }, [
    currentConversationData,
    isCurrentConversationError,
    isCurrentConversationLoading,
  ])

  // Synchronize the conversation id
  useEffect(() => {
    if (isNullOrUndefined(responseConversationId)) return
    setCurrentConversationId(responseConversationId)

    if (
      !window.location.search.includes('conversationId=') ||
      !isCurrentConversationError
    ) {
      // Synchronize the conversation history after creating a new conversation
      const conversationExists = conversationHistoryData?.some(
        (conv) => conv.conversationId === responseConversationId,
      )

      if (!conversationExists) {
        conversationHistoryData?.push({
          conversationId: responseConversationId,
        })
      }

      // Update the URL with the new conversationId
      const newUrl = `${window.location.pathname}?conversationId=${responseConversationId}`
      window.history.replaceState(null, '', newUrl)
    }
  }, [
    responseConversationId,
    isCurrentConversationError,
    conversationHistoryData,
  ])

  // Synchronize streaming AI response in the current conversation
  useEffect(() => {
    if (isConversationStreamLoading) {
      const newMessage = {
        message: streamAiResponse,
        messageType: 'ASSISTANT',
        timestamp: new Date().toISOString(),
      } satisfies MessageHistory

      setCurrentConversation((prev) => {
        const lastMessage = prev ? prev[prev.length - 1] : null
        const isUserMessage = lastMessage?.messageType === 'USER'

        return isUserMessage
          ? [...(prev ?? []), newMessage]
          : [...(prev?.slice(0, -1) ?? []), newMessage]
      })
    }
  }, [isConversationStreamLoading, streamAiResponse])

  const handleSubmit = (userInput: string) => {
    const newUserMessage = {
      message: userInput,
      messageType: 'USER',
      timestamp: new Date().toISOString(),
    } satisfies MessageHistory

    setCurrentConversation((prev) =>
      isNotNullOrUndefined(prev) ? [...prev, newUserMessage] : [newUserMessage],
    )

    streamAi(userInput)
    scrollToBottom()
  }

  const handleDeleteConversation = (conversationId: string) => {
    deleteConversationMutation.mutate(conversationId)
  }

  const handleCreateNewConversation = () => {
    // Stop any ongoing streaming when switching conversations
    cancelStreamAi()
    setCurrentConversationId(undefined)
    setCurrentConversation(undefined)
    window.history.replaceState(null, '', window.location.pathname)
  }

  const handleSelectConversation = (conversationId: string) => {
    // Avoid updating if the same conversation is selected
    if (conversationId && conversationId === currentConversationId) return

    // Stop any ongoing streaming when switching conversations
    cancelStreamAi()

    setCurrentConversationId(conversationId)
    const newUrl = `${window.location.pathname}?conversationId=${conversationId}`
    window.history.replaceState(null, '', newUrl)
    scrollToBottom()
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginTop: 'calc(-1 * (12px + var(--Header-height)))',
        }}
      >
        <div style={{ paddingLeft: '20px' }}>
          <AiConversationHistory
            conversations={conversationHistoryData}
            currentConversationId={currentConversationId!}
            isLoading={isConversationHistoryLoading}
            onDeleteConversation={handleDeleteConversation}
            onNewConversation={handleCreateNewConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>
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
            }}
          >
            <AiMessages messages={currentConversation} />
          </div>

          <div
            style={{
              paddingTop: '10px',
              padding: '10px',
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <AiInput
              cancel={cancelStreamAi}
              isLoading={isConversationStreamLoading}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Ai
