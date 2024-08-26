import Box from '@mui/joy/Box'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/LayoutHeader'
import LayoutSidebar from './components/LayoutSideBar'

const Layout: FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', fontFamily: 'Poppins' }}>
      <LayoutSidebar />
      <Header />
      <Box
        component="main"
        sx={{
          pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          fontFamily: 'Poppins',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
