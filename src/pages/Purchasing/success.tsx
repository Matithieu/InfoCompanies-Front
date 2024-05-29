import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemContent,
  Sheet,
  Typography,
} from '@mui/joy'

import useAuthStore from '../../store/authStore'
import { loadUserFromLocalStorage } from '../../utils/loadFromLocalStorage'
import { useAppNavigate } from '../../utils/navigation/navigation'

const OrderConfirmation = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const { navigation } = useAppNavigate()
  const { authUser, setAuthUser } = useAuthStore()

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
            Thank you for your purchase!
          </Typography>
          <Typography gutterBottom level="body-md">
            Your order has been successfully processed. Please check your email
            for order confirmation.
          </Typography>
        </div>

        <Divider style={{ marginBottom: '20px' }} />

        <Typography gutterBottom level="h4">
          Order Details
        </Typography>

        <Typography color="neutral" level="h4">
          {queryParams.toString().split('&').join('\n')}
        </Typography>

        <List>
          <ListItem>
            <ListItemContent>
              <Typography gutterBottom level="h4">
                Order ID: 123456
              </Typography>
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <Typography gutterBottom level="h4">
                Total amount: $100
              </Typography>
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <Typography gutterBottom level="h4">
                Payment method: Credit Card
              </Typography>
            </ListItemContent>
          </ListItem>
        </List>
        <Button
          fullWidth
          color="primary"
          style={{ marginTop: '20px' }}
          variant="soft"
          onClick={() => {
            const user = loadUserFromLocalStorage('authUser')

            if (user) {
              user.isVerified = true
              setAuthUser(user) // Clear the authenticated user
            }

            console.log('test ' + authUser)
            setTimeout(() => {
              navigation.toHome()
            }, 500)
          }}
        >
          Let&apos;s go !
        </Button>
      </Sheet>
    </div>
  )
}

export default OrderConfirmation
