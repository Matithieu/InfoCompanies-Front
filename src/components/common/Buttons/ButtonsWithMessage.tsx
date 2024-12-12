import { Button } from '@/components/ui/button'
import { useAppNavigate } from '@/hooks/useAppNavigate'
import useAuthManager from '@/hooks/useAuthManager'
import { Typography } from '@mui/joy'
import { FC } from 'react'

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
      buttonLabel="Login"
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
      buttonLabel="Se déconnecter"
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
      buttonLabel="Select Subscription"
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
      buttonLabel="Change Plan"
      handleButtonClick={navigation.toAccount}
      message={message}
    />
  )
}
