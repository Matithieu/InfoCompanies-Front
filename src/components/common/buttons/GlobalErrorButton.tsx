import { Button, Typography } from '@mui/joy'
import useAuthManager from '../../../hooks/useAuthManager'
import { useAppNavigate } from '../../../utils/navigation/navigation'

interface ErrorButtonProps {
  error: Error
}

export function GlobalErrorButton({ error }: ErrorButtonProps) {
  const { navigation } = useAppNavigate()
  const authUser = useAuthManager()

  const handleButtonClick = () => {
    switch (error.message) {
      case 'Subscription Error':
        console.log('Select Subscription')
        break
      case 'Too many requests':
        navigation.toAccount()
        break
      case 'Network Error':
        console.log('Check Network Connection')
        break
      case 'Unauthorized':
        authUser.signIn()
        break
      default:
        console.log('Unknown Error')
        break
    }
  }

  const getButtonLabel = () => {
    switch (error.message) {
      case 'Too many requests':
        return 'Select Subscription'
      case 'Subscription Error':
        return 'Change Plan'
      case 'Network Error':
        return 'Retry Connection'
      case 'Unauthorized':
        return 'Login'
      default:
        return 'Try Again'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px', // Added a gap for better spacing between the elements
      }}
    >
      <Typography>{error.message}</Typography>
      <Button color="primary" variant="soft" onClick={handleButtonClick}>
        {getButtonLabel()}
      </Button>
    </div>
  )
}
