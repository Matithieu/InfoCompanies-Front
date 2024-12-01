import { Box, Button, Container, Typography } from '@mui/joy'

import { useAppNavigate } from '../../hooks/useAppNavigate'

export default function Page401() {
  const { navigation } = useAppNavigate()

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" level="h2">
          404
        </Typography>
        <Typography color="neutral" level="h4">
          Oups! Vous n&apos;avez pas les droits pour accéder à cette page.
        </Typography>
        <Button
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          variant="soft"
          onClick={() => {
            navigation.toHome()
          }}
        >
          Retour à l&apos;accueil
        </Button>
      </Box>
    </Container>
  )
}
