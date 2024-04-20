import { useNavigate } from "react-router-dom"
import { Box, Button, Container, Typography } from "@mui/joy"

export default function Page401() {
  const navigate = useNavigate()

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
          Oups! Vous n'avez pas les droits pour accéder à cette page.
        </Typography>
        <Button
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          variant="soft"
          onClick={() => {
            navigate("/")
          }}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  )
}
