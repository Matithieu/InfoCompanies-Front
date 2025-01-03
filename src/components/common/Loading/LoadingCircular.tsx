import { Box } from '@mui/joy'
import CircularProgress from '@mui/joy/CircularProgress'
import { FC } from 'react'

const LoadingCircular: FC = () => {
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
    </Box>
  )
}

export default LoadingCircular
