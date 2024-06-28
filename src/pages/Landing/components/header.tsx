import AdbIcon from '@mui/icons-material/Adb'

import useAuthManager from '../../../hooks/useAuthManager'
import { Container, Typography, Box, Link } from '@mui/joy'
import { AppBar, Toolbar } from '@mui/material'
import { useAppNavigate } from '../../../utils/navigation/navigation'

export default function HeaderLanding() {
  const { navigation } = useAppNavigate()
  const authManager = useAuthManager()

  return (
    <AppBar style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 2,
          mx: 'auto',
        }}
      >
        <Toolbar disableGutters sx={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 1,
            }}
          >
            <AdbIcon
              onClick={() => navigation.toHome()}
              sx={{ display: { md: 'flex' }, mr: 1, cursor: 'pointer' }}
            />
            <Typography
              variant="plain"
              noWrap
              sx={{
                justifyContent: 'flex-end',
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </div>
          <Box>
            <Link
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => authManager.signIn()}
            >
              Sign in
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
