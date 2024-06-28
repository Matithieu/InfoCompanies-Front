import { Link, Box } from '@mui/material'
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
        onClick={() => navigation.toTerms()}
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Terms
      </Link>
      <Link
        onClick={() => navigation.toPrivacy()}
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Privacy
      </Link>
      <Link
        onClick={() => navigation.toLegal()}
        sx={{
          cursor: 'pointer',
          margin: '0 10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Legal
      </Link>
    </Box>
  )
}
