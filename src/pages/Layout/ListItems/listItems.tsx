import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HelpIcon from '@mui/icons-material/Help';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography } from '@mui/material';
/*
import useAuthStore from '../../../store/authStore';
import { User } from '../../../data/user';
import { useState } from 'react';
*/
//import Cookies from 'js-cookie';

// Styles CSS pour supprimer le surlignage bleu des liens
export const linkStyles = {
  textDecoration: 'none', // Supprime la décoration de texte
  outline: 'none', // Supprime le surlignage bleu
  color: 'inherit', // Garde la couleur du texte par défaut
};

//A chaque fois que l'on clique sur un lien, on vérifie si le lien est le même que celui de la page actuelle
//Si oui, on renvoie true, sinon false

export const MainListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset >
        <Typography style={{ fontFamily: 'Poppins', marginTop: '10px', marginBottom: '10px' }}>MENU</Typography>
      </ListSubheader>

      <Link to="/dashboard" style={linkStyles}>
        <ListItemButton >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Dashboard</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/favorites" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Favoris</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/analytics" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Outils d'analyse</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/reports" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Reports</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/integrations" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Integrations</Typography>} />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}

export const SecondaryListItems = () => {

  /*
  // Function to remove the verified user
  const { authUser, requestLoading, setAuthUser } = useAuthStore();
  const [isAuthUserLoaded, setIsAuthUserLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!requestLoading) {
      setIsAuthUserLoaded(true);
    }
  }, [requestLoading]);

  function removeVerifiedUser() {
    if (isAuthUserLoaded && authUser instanceof User && typeof authUser.getVerified === 'function') {
      const authUserWithFalseVerified = authUser;
      authUserWithFalseVerified?.setVerified(false);
      setAuthUser(authUserWithFalseVerified);
      console.log(authUserWithFalseVerified);
    }
    else {
      console.log("Erreur");
    }
  }
  */

  return (
    <React.Fragment>
      <ListSubheader component="div" inset >
        OTHERS
      </ListSubheader>

      <Link to="/settings" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Settings</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/account" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Compte</Typography>} />
        </ListItemButton>
      </Link>

      <Link to="/help" style={linkStyles}>
        <ListItemButton>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText disableTypography
            primary={<Typography style={{ fontFamily: 'Poppins' }}>Aide</Typography>} />
        </ListItemButton>
      </Link>

      <ListItemButton onClick={
        () => {
          //removeVerifiedUser();
        }
      }>
        <ListItemIcon>
          <RefreshIcon />
        </ListItemIcon>
        <ListItemText disableTypography
          primary={<Typography style={{ fontFamily: 'Poppins' }}>CLEAR CACHE</Typography>} />
      </ListItemButton>
    </React.Fragment>
  );
};
