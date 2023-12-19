import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Divider } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 500, m: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color="primary.main">
            Purchase Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your order #12345 has been processed.
            We've emailed you the order details.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => {
            navigate('/dashboard');
          }}>
            Let's Go!
          </Button>
          <Button variant="outlined" startIcon={<TrackChangesIcon />}>
            Track Order
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PurchaseSuccessPage;
