import { Box, Button, Container, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

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
        <Typography level="h4" color="neutral">
          Oups! La page que vous cherchez n'existe pas.
        </Typography>
        <Button
          variant="soft"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
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
