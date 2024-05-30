import { Button, Typography } from '@mui/joy'

import useAuthManager from '../../../hooks/useAuthManager'

type AuthButtonProps = {
  message?: string
}

export function LoginButton({ message }: AuthButtonProps) {
  const authUser = useAuthManager()

  return (
    <div>
      <Typography>
        {message}
        <Button
          color="primary"
          variant="soft"
          onClick={() => {
            authUser.signIn()
          }}
        >
          Se connecter
        </Button>
      </Typography>
    </div>
  )
}

export function LogoutButton({ message }: AuthButtonProps) {
  const authUser = useAuthManager()

  return (
    <Typography>
      {message}
      <Button
        color="primary"
        variant="soft"
        onClick={() => {
          authUser.signOut()
        }}
      >
        Se déconnecter
      </Button>
    </Typography>
  )
}

interface ErrorButtonProps {
  error: Error
}

export function ErrorButton({ error }: ErrorButtonProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>{error.message + `: ${error.name}}`}</h1>
      <LogoutButton />
    </div>
  )
}

export function SelectSubscriptionButton({ message }: AuthButtonProps) {
  return (
    <Typography>
      {message}
      <Button
        color="primary"
        variant="soft"
        onClick={() => {
          console.log('Select Subscription')
        }}
      >
        Select Subscription
      </Button>
    </Typography>
  )
}
