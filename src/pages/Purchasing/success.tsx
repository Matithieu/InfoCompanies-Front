import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Button, Divider, Sheet, Typography } from '@mui/joy'

import useAuthManager from '../../hooks/useAuthManager'
import useAuthStore from '../../store/authStore'

const OrderConfirmation = () => {
  // const queryParams = new URLSearchParams(window.location.search)
  const { setAuthUser } = useAuthStore()
  const { signIn } = useAuthManager()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: '7rem',
      }}
    >
      <Sheet style={{ padding: '20px', maxWidth: '400px' }} variant="soft">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: '60px' }}
          />
          <Typography gutterBottom level="h4">
            Merci pour votre achat !
          </Typography>
          <Typography gutterBottom level="body-md">
            Appuiez sur le bouton juste dessous pour commencer
          </Typography>
        </div>

        <Divider style={{ marginBottom: '20px' }} />

        <Button
          fullWidth
          color="primary"
          style={{ marginTop: '20px' }}
          variant="soft"
          onClick={() => {
            setAuthUser(null)
            // Going through signIn flow refresh the token inside the oauth2 proxy
            // Allowing the roles inside the token to be updated
            signIn()
          }}
        >
          Let&apos;s go !
        </Button>
      </Sheet>
    </div>
  )
}

export default OrderConfirmation
