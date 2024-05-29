import { Box, Typography } from '@mui/joy'
import CircularProgress from '@mui/joy/CircularProgress'

function Loading() {
  return (
    <Box
      sx={{
        id: 'suspense-fallback',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <CircularProgress />
      <Typography level="h4" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading

// If authUser is null, the fetch the user data from the server
