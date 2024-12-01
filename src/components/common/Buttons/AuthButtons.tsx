import { Button } from '@/components/ui/button'
import { Typography } from '@mui/joy'

import { useAppNavigate } from '../../../hooks/useAppNavigate'
import useAuthManager from '../../../hooks/useAuthManager'

type ButtonProps = {
  message?: string
}

export function LoginButton({ message }: ButtonProps) {
  const authUser = useAuthManager()

  return (
    <div>
      <Typography>
        {message}
        <Button
          onClick={() => {
            authUser.signIn()
          }}
        >
          Login
        </Button>
      </Typography>
    </div>
  )
}

export function LogoutButton({ message }: ButtonProps) {
  const authUser = useAuthManager()

  return (
    <Typography>
      {message}
      <Button
        color="primary"
        onClick={() => {
          authUser.signOut()
        }}
      >
        Se déconnecter
      </Button>
    </Typography>
  )
}

export function SelectSubscriptionButton({ message }: ButtonProps) {
  const { navigation } = useAppNavigate()

  return (
    <Typography>
      {message}
      <Button
        color="primary"
        onClick={() => {
          navigation.toSubscription()
        }}
      >
        Select Subscription
      </Button>
    </Typography>
  )
}

export function QuotaExceededButton({ message }: ButtonProps) {
  const { navigation } = useAppNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <Typography>{message}</Typography>
      <Button
        color="primary"
        onClick={() => {
          navigation.toAccount()
        }}
      >
        Change Plan
      </Button>
    </div>
  )
}
