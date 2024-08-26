import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Box from '@mui/joy/Box'
import GlobalStyles from '@mui/joy/GlobalStyles'
import Input from '@mui/joy/Input'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { FC, useState } from 'react'

import { useAppNavigate } from '../../../utils/navigation/navigation'
import ColorSchemeToggle from '../colorScheme'
import { closeSidebar } from '../layout.util'
import LayoutListItems from './LayoutListItems'

const LayoutSidebar: FC = () => {
  const { navigation } = useAppNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm.trim() !== '') {
      navigation.toSearch(searchTerm)
    }
  }

  return (
    <Sheet
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
        sx={{
          position: 'fixed',
          zIndex: 9999,
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
          size="md"
          startDecorator={<SearchRoundedIcon />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <LayoutListItems />
    </Sheet>
  )
}

export default LayoutSidebar
