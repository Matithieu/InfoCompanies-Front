import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { LoadUserFromLocalStorage } from '../../utils/loadUser';

const OrderConfirmation = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthStore();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', marginTop: "7rem" }}>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CheckCircleOutlineIcon color="success" style={{ fontSize: '60px' }} />
          <Typography variant="h5" gutterBottom>
            Thank you for your purchase!
          </Typography>
          <Typography variant="body2" gutterBottom>
            Your order has been successfully processed. Please check your email for order confirmation.
          </Typography>
        </div>

        <Divider style={{ marginBottom: '20px' }} />

        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>

        <Typography color={'black'} variant='h6'>{queryParams.toString().split("&").join("\n")}</Typography>

        <List>
          <ListItem>
            <ListItemText primary="Order number:" secondary="#123456" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Order total:" secondary="$120.00" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Delivery address:" secondary="123, ABC Street, City, Country" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={() => {
          const user = LoadUserFromLocalStorage("authUser");
          if (user) {
            user.setVerified(true);
            setAuthUser(user); // Clear the authenticated user
          }
          console.log("test " + authUser);
          setTimeout(() => {
            navigate('/dashboard');
          }
            , 500);
        }}>
          Let's go !
        </Button>
      </Paper>
    </div>
  );
};

export default OrderConfirmation;
