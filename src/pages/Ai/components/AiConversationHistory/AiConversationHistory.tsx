import { ConversationHistory as ConversationHistoryType } from '@/types/index.types'
import { FC } from 'react'

import AiConversationBody from './components/AiConversationBody'

type AiConversationHistoryProps = {
  currentConversationId: string
  conversations: Array<ConversationHistoryType> | undefined
  onDeleteConversation: (conversationId: string) => void
  onNewConversation: () => void
  onSelectConversation: (conversationId: string) => void
  isLoading: boolean
}

const AiConversationHistory: FC<AiConversationHistoryProps> = ({
  currentConversationId,
  conversations,
  onDeleteConversation,
  onNewConversation,
  onSelectConversation,
  isLoading,
}) => {
  if (!conversations || conversations.length === 0) {
    return <div>No conversations available.</div>
  }

  return (
    <div
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px',
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 className="pb-2">Conversation History</h2>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          borderTop: '1px solid #eee',
          paddingTop: '10px',
        }}
      >
        <AiConversationBody
          conversations={conversations}
          currentConversationId={currentConversationId}
          isLoading={isLoading}
          onDeleteConversation={onDeleteConversation}
          onNewConversation={onNewConversation}
          onSelectConversation={onSelectConversation}
        />
      </div>
    </div>
  )
}

export default AiConversationHistory
