import { Box, Link } from '@mui/material'
import { useAppNavigate } from '../../utils/navigation/navigation'

export default function Footer() {
  const { navigation } = useAppNavigate()

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: '#050510',
        color: 'white',
        fontSize: '14px',
      }}
    >
      <Link
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={() => navigation.toTerms()}
      >
        Terms
      </Link>
      <Link
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={() => navigation.toPrivacy()}
      >
        Privacy
      </Link>
      <Link
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={() => navigation.toLegal()}
      >
        Legal
      </Link>
    </Box>
  )
}
