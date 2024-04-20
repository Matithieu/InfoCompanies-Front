import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/joy";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" level="h2">
          404
        </Typography>
        <Typography color="neutral" level="h4">
          Oups! La page que vous cherchez n'existe pas.
        </Typography>
        <Button
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          variant="soft"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
}
