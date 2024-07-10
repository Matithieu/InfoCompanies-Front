import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PendingIcon from '@mui/icons-material/Pending'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import GlobalStyles from '@mui/joy/GlobalStyles'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import useAuthManager from '../../hooks/useAuthManager'
import useAuthStore from '../../store/authStore'
import { useAppNavigate } from '../../utils/navigation/navigation'
import ColorSchemeToggle from './colorScheme'
import Header from './header'
import { linkStyles } from './ListItems/types'
import { closeSidebar } from './utils'

export function Sidebar() {
  const { navigation } = useAppNavigate()

  const { authUser } = useAuthStore()
  const authManager = useAuthManager()

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm.trim() !== '') {
      navigation.toSearch(searchTerm)
    }
  }

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
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
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">Info&apos;Companies</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>

      <form onSubmit={handleSearch}>
        <Input
          id="search-company"
          placeholder="Search"
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigation.toDashboard()
              }}
            >
              <DashboardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                navigation.toFavorites()
              }}
            >
              <PendingIcon />
              <ListItemContent>
                <Typography level="title-sm">To Do</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                navigation.toSettings()
              }}
            >
              <SettingsRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Settings</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <div
        aria-label="user-panel"
        style={{ ...linkStyles, cursor: 'pointer' }}
        onClick={() => {
          navigation.toAccount()
        }}
      >
        <Box
          id="user-page"
          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              navigation.toSettings()
            }}
          >
            <Avatar size="sm" variant="outlined">
              {authUser?.firstName
                ?.charAt(0)
                .toLocaleUpperCase()
                .toLocaleUpperCase() ?? 'E'}
            </Avatar>
          </IconButton>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {authUser?.firstName ?? 'Error'}
            </Typography>
            <Typography level="body-xs">
              {authUser?.lastName ?? 'Error'}
            </Typography>
          </Box>
          <IconButton
            color="neutral"
            size="sm"
            variant="plain"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              authManager.signOut()
            }}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </div>
    </Sheet>
  )
}

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', fontFamily: 'Poppins' }}>
      <Sidebar />
      <Header />
      <Box
        className="MainContent"
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
