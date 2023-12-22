import { Paper, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

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
        <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={()=> {
          navigate('/dashboard');
        }}>
          Let's go !
        </Button>
      </Paper>
    </div>
  );
};

export default OrderConfirmation;
