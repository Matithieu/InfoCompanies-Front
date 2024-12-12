import { Button } from '@/components/ui/button'
import { useAppNavigate } from '@/hooks/useAppNavigate'
import useAuthManager from '@/hooks/useAuthManager'
import { formatMessage } from '@/services/intl/intl'
import { Typography } from '@mui/joy'
import { FC } from 'react'

import toastMessages from '../Toasts/toast.messages'

type ButtonProps = {
  message?: string
  handleButtonClick: () => void
  buttonLabel: string
}

type MessageButtonProps = {
  message?: string
}

// Generic Button Component
const ActionButton: FC<ButtonProps> = ({
  message,
  handleButtonClick,
  buttonLabel,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '1rem',
      }}
    >
      {message && <Typography>{message}</Typography>}
      <Button color="primary" onClick={handleButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  )
}

export const LoginButtonWithMessage: FC<MessageButtonProps> = ({ message }) => {
  const authUser = useAuthManager()

  return (
    <ActionButton
      buttonLabel={formatMessage(toastMessages.errorConnect)}
      handleButtonClick={authUser.signIn}
      message={message}
    />
  )
}

export const LogoutButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const authUser = useAuthManager()

  return (
    <ActionButton
      buttonLabel={formatMessage(toastMessages.errorReconnect)}
      handleButtonClick={authUser.signOut}
      message={message}
    />
  )
}

export const SelectSubscriptionButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const { navigation } = useAppNavigate()

  return (
    <ActionButton
      buttonLabel={formatMessage(toastMessages.warnSelectSubscription)}
      handleButtonClick={navigation.toSubscription}
      message={message}
    />
  )
}

export const QuotaExceededButtonWithMessage: FC<MessageButtonProps> = ({
  message,
}) => {
  const { navigation } = useAppNavigate()

  return (
    <ActionButton
      buttonLabel={formatMessage(toastMessages.errorQuotaExceeded)}
      handleButtonClick={navigation.toAccount}
      message={message}
    />
  )
}
