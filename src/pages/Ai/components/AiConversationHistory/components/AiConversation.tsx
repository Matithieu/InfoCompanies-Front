import { ConversationHistory } from '@/types/index.types'
import DeleteIcon from '@mui/icons-material/Delete'
import { Tooltip, Typography } from '@mui/joy'
import { FC, useState } from 'react'

type AiConversationProps = {
  conversation: ConversationHistory
  currentConversationId: string | undefined
  onDeleteConversation: (conversationId: string) => void
  onSelectConversation: (conversationId: string) => void
}

const AiConversation: FC<AiConversationProps> = ({
  conversation: { conversationId, title },
  currentConversationId,
  onDeleteConversation,
  onSelectConversation,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getBackgroundColor = () => {
    if (conversationId === currentConversationId) {
      return '#d3d3d3'
    }

    return isHovered ? 'lightgray' : 'transparent'
  }

  return (
    <li
      key={conversationId}
      style={{
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        borderRadius: '4px',
        padding: '5px 0',
        backgroundColor: getBackgroundColor(),
      }}
      onClick={() => onSelectConversation(conversationId)}
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10px',
          paddingLeft: '10px',
        }}
      >
        <Typography>{title}</Typography>
        <Tooltip placement="right" title="Delete Conversation">
          <DeleteIcon
            style={{
              float: 'right',
              cursor: 'pointer',
              opacity: isHovered ? '1' : '0.0',
            }}
            onClick={(event) => {
              event.stopPropagation()
              onDeleteConversation(conversationId)
            }}
          />
        </Tooltip>
      </div>
    </li>
  )
}

export default AiConversation
