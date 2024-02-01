import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Payments() {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Payments
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can manage your payments and payment methods.
      </Typography>
      {/* Ajoutez ici le contenu spécifique à la section des paiements */}
    </Paper>
  );
}

export default Payments;
