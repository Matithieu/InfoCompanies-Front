import { Box, Button, Container, Typography } from '@mui/joy'

import { useAppNavigate } from '../../hooks/useAppNavigate'
import { formatMessage } from '../../services/intl/intl'
import errorMessages from './error.messages'

export default function Page404() {
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
          {formatMessage(errorMessages.description)}
        </Typography>
        <Button
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          variant="soft"
          onClick={() => {
            navigation.toHome()
          }}
        >
          {formatMessage(errorMessages.buttonText)}
        </Button>
      </Box>
    </Container>
  )
}
