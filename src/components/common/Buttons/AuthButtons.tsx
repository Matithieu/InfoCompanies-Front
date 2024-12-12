import { Button } from '@/components/ui/button'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'

export const LoginButton: FC = () => {
  const authUser = useAuthManager()

  return (
    <Button
      onClick={() => {
        authUser.signIn()
      }}
    >
      Login
    </Button>
  )
}

export const LogoutButton: FC = () => {
  const authUser = useAuthManager()

  return (
    <Button
      color="primary"
      onClick={() => {
        authUser.signOut()
      }}
    >
      Se déconnecter
    </Button>
  )
}
