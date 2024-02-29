import { Sheet, Typography } from "@mui/joy";

function Payments() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 2,
      }}
    >
      <Typography level="h4" gutterBottom>
        Payments
      </Typography>
      <Typography level="body-md" gutterBottom>
        Here you can manage your payments and payment methods.
      </Typography>
      {/* Ajoutez ici le contenu spécifique à la section des paiements */}
    </Sheet>
  );
}

export default Payments;
