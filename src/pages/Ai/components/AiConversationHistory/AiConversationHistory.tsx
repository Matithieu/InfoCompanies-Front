import Loading from '@/components/common/Loading/Loading'
import { ConversationHistory as ConversationHistoryType } from '@/types/index.types'
import CreateIcon from '@mui/icons-material/Create'
import { Button } from '@mui/joy'
import { FC } from 'react'

import AiConversation from './components/AiConversations'

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
        <Loading isLoading={isLoading || conversations === undefined}>
          <ul>
            <li
              style={{
                padding: '10px',
                cursor: 'pointer',
                marginBottom: '10px',
                borderRadius: '4px',
              }}
              onClick={onNewConversation}
            >
              <Button
                fullWidth
                startDecorator={<CreateIcon />}
                variant="outlined"
              >
                New Conversation
              </Button>
            </li>

            {conversations.map(({ conversationId }, index) => (
              <AiConversation
                key={conversationId}
                conversationId={conversationId}
                currentConversationId={currentConversationId}
                index={index}
                onDeleteConversation={onDeleteConversation}
                onSelectConversation={onSelectConversation}
              />
            ))}
          </ul>
        </Loading>
      </div>
    </div>
  )
}

export default AiConversationHistory
