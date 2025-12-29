import Loading from '@/components/common/Loading/Loading'
import { ConversationHistory as ConversationHistoryType } from '@/types/index.types'
import { NNU } from '@/utils/assertion.util'
import { FC } from 'react'

type ConversationHistoryProps = {
  conversations: Array<ConversationHistoryType> | undefined
  onNewConversation: () => void
  onSelectConversation: (conversationId: string) => void
  isLoading: boolean
}

const ConversationHistory: FC<ConversationHistoryProps> = ({
  conversations,
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
        border: '1px solid #ccc',
        padding: '10px',
        width: '300px',
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Conversation History</h2>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          borderTop: '1px solid #eee',
          paddingTop: '10px',
        }}
      >
        <Loading isLoading={isLoading || conversations === undefined}>
          <ul>
            <li
              style={{
                padding: '10px',
                cursor: 'pointer',
                border: '5px solid #eee',
              }}
              onClick={onNewConversation}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'lightgray'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              + New Conversation
            </li>

            {NNU(conversations).map(({ conversationId }, index) => (
              <li
                key={conversationId}
                style={{
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  padding: '5px 0',
                }}
                onClick={() => onSelectConversation(conversationId)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'lightgray'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Conversation {index + 1}
              </li>
            ))}
          </ul>
        </Loading>
      </div>
    </div>
  )
}

export default ConversationHistory
