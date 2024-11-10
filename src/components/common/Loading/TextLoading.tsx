import { FC } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { GlobalErrorButton } from '../Buttons/GlobalErrorButton'

type LoadingTextProps = {
  text?: string
  error?: Error | null
}

const LoadingText: FC<LoadingTextProps> = ({
  text = formatMessage(commonMessages.loading),
  error,
}) => {
  if (error) {
    return <GlobalErrorButton error={error} />
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>{text}</p>
    </div>
  )
}

export default LoadingText
