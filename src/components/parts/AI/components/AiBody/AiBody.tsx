import { MessageHistory } from '@/types/index.types'
import { FC } from 'react'

import Message from './components/Message'

type AiBodyProps = { messages: Array<MessageHistory> | undefined }

const AiBody: FC<AiBodyProps> = ({ messages }) => {
  if (messages === undefined || null) {
    return (
      <div style={{ color: 'gray', marginTop: 5, marginBottom: '40px' }}>
        How is your day going ?
      </div>
    )
  }

  return (
    <div
      style={{
        borderWidth: '1px',
        borderColor: 'black',
        borderRadius: '5px',
      }}
    >
      {messages.map(({ message, messageType, timestamp }, index) => (
        <Message
          key={index}
          message={message}
          messageType={messageType}
          timestamp={timestamp}
        />
      ))}
    </div>
  )
}

export default AiBody
