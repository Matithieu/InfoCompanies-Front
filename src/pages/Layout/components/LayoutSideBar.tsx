import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Box from '@mui/joy/Box'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { FC, FormEvent, useEffect, useRef, useState } from 'react'

import { useAppNavigate } from '../../../utils/navigation/navigation'
import { closeSidebar } from '../layout.util'
import LayoutListItems from './LayoutListItems'

const LayoutSidebar: FC = () => {
  const { navigation } = useAppNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [manualOpen, setManualOpen] = useState(false) // Track manual open state
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm.trim() !== '') {
      navigation.toSearch(searchTerm)
    }
  }

  const handleMouseEnter = () => {
    if (manualOpen) return // Prevent hover actions if sidebar was manually opened

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(true)
    }, 200)
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
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 9998,
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
          zIndex: 9998,
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
          marginBottom: 3.5,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <LogoDevIcon fontSize="large" />

        {open && (
          <>
            <Typography level="title-lg">Info&apos;Companies</Typography>
            {/* <ColorSchemeToggle /> */}
          </>
        )}
      </Box>

      <Box>
        <form onSubmit={handleSearch}>
          <Input
            id="search-company"
            placeholder="Search"
            size="md"
            startDecorator={<SearchRoundedIcon />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </Box>

      <LayoutListItems open={open} />
    </Sheet>
  )
}

export default LayoutSidebar
