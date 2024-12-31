import { useAppNavigate } from '@/hooks/useAppNavigate'
import LogoDevIcon from '@mui/icons-material/LogoDev'
import Box from '@mui/joy/Box'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Sheet from '@mui/joy/Sheet'
import { IconButton } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'

import SearchAppBar from '../../../components/common/SearchBar'
import { closeSidebar } from '../layout.util'
import LayoutListItems from './LayoutListItems'

const LayoutSidebar: FC = () => {
  const [open, setOpen] = useState(false)
  const [manualOpen, setManualOpen] = useState(false) // Track manual open state
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null) // Ref for sidebar element
  const { navigation } = useAppNavigate()

  const handleMouseEnter = () => {
    if (manualOpen) return // Prevent hover actions if sidebar was manually opened

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, 600)
  }

  const handleMouseLeave = () => {
    if (manualOpen) return // Prevent hover actions if sidebar was manually opened

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 100)
  }

  // Handle clicks outside the sidebar to close it if manualOpen is true
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        manualOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar()
        setManualOpen(false)
      }
    }

    if (manualOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [manualOpen])

  // Listen for custom events from utility functions
  useEffect(() => {
    const handleOpen = () => {
      setManualOpen(true)
      setOpen(true)
    }

    const handleClose = () => {
      setManualOpen(false)
      setOpen(false)
    }

    window.addEventListener('sidebar:open', handleOpen)
    window.addEventListener('sidebar:close', handleClose)

    return () => {
      window.removeEventListener('sidebar:open', handleOpen)
      window.removeEventListener('sidebar:close', handleClose)
    }
  }, [])

  return (
    <Sheet
      ref={sidebarRef} // Attach ref to the sidebar
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1000,
        height: '100dvh',
        width: open ? 'var(--Sidebar-width)' : '75px',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        overflowX: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px', // Full width when hovered
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box
        sx={{
          display: 'flex',
          minHeight: '1px', // Ensures consistent height
          flexDirection: 'row',
          marginTop: {
            xs: 5,
            md: 0,
          },
          marginBottom: {
            xs: 0,
            md: 2.6,
          },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <IconButton
          style={{ color: 'inherit' }}
          onClick={() => navigation.toDashboard()}
        >
          <LogoDevIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box>
        <SearchAppBar isSidebarOpen={open} />
      </Box>

      <LayoutListItems open={open} />
    </Sheet>
  )
}

export default LayoutSidebar
