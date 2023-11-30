import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './ListItems/listItems.tsx';
import AccountMenu from '../../components/AccountMenuPopUp/index.tsx';
import SearchBar from '../../components/SearchBar/index.tsx';

// Importez un nouvel icône pour le mode sombre et le mode clair
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Paper } from '@mui/material';

function Copyright(props: any) {
  return (
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        bottom: 0,
        width: '100%',
        position: 'fixed',
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Typography variant="body2" color="text.secondary" align="center" {...props} component={"footer"}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Paper>
  );
}
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// Créez un thème sombre et un thème clair
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Activez le mode sombre 
    primary: {
      main: '#1976D2', // Couleur principale (bleu)
    },
    secondary: {
      main: '#388E3C', // Couleur secondaire (vert)
    },
    background: {
      default: '#121212', // Couleur de fond par défaut (gris foncé)
      paper: '#333333', // Couleur de fond des panneaux (gris)
    },
    text: {
      primary: '#FFFFFF', // Couleur du texte principal (blanc)
      secondary: '#CCCCCC', // Couleur du texte secondaire (gris clair)
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Couleur : bleu
    },
    secondary: {
      main: '#388E3C', // Couleur : vert
    },
    background: {
      default: '#FFFFFF', // Couleur : blanc
      paper: '#F5F5F5', // Couleur de fond des panneaux (gris clair)
    },
    text: {
      primary: '#000000', // Couleur : noir
      secondary: '#555555', // Couleur du texte secondaire (gris)
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

// Composant DarkModeToggle
function DarkModeToggle({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  return (
    <IconButton color="inherit" onClick={toggleDarkMode}>
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default function Home({ renderComponent }: { renderComponent: () => JSX.Element }) {
  // Utilisez le localStorage pour stocker l'état du mode sombre
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = React.useState(isDarkMode);

  const isDrawerOpen = localStorage.getItem('stateDrawer');

  const [open, setOpen] = React.useState(isDrawerOpen === 'true');
  const toggleDrawer = () => {
    setOpen(!open);
    localStorage.setItem('stateDrawer', JSON.stringify(!open));
  };

  // Fonction pour activer/désactiver le mode sombre
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  return (

    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{}}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <SearchBar />

            {/* Utilisez le composant DarkModeToggle */}
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div style={{ marginLeft: 'auto' }}>
              <Badge badgeContent={0} color="secondary">
                <AccountMenu />
              </Badge>
            </div>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          {renderComponent()}

        </Box>
      </Box>
    </ThemeProvider>
  );
}
