import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import BarChartIcon from '@mui/icons-material/BarChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HelpIcon from '@mui/icons-material/Help'
import LayersIcon from '@mui/icons-material/Layers'
import RefreshIcon from '@mui/icons-material/Refresh'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
  Typography,
} from '@mui/joy'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { useAppNavigate } from '../../../utils/navigation/navigation'
import { linkStyles } from './types'
/*
import useAuthStore from '../../../store/authStore';
import { User } from '../../../data/user';
import { useState } from 'react';
*/
//import Cookies from 'js-cookie';

//A chaque fois que l'on clique sur un lien, on vérifie si le lien est le même que celui de la page actuelle
//Si oui, on renvoie true, sinon false

export const MainListItems = () => {
  const { navigation } = useAppNavigate()

  return (
    <React.Fragment>
      <ListSubheader component="div">
        <Typography
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          MENU
        </Typography>
      </ListSubheader>

      <Link style={linkStyles} to="/dashboard">
        <ListItemButton
          onClick={() => {
            navigation.toDashboard()
          }}
        >
          <ListItemDecorator>
            <DashboardIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Dashboard</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/favorites">
        <ListItemButton>
          <ListItemDecorator>
            <FavoriteIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Favoris</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/analytics">
        <ListItemButton>
          <ListItemDecorator>
            <AnalyticsIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Outils d&apos;analyse</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/reports">
        <ListItemButton>
          <ListItemDecorator>
            <BarChartIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Reports</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/integrations">
        <ListItemButton>
          <ListItemDecorator>
            <LayersIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Integration</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>
    </React.Fragment>
  )
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
      <ListSubheader component="div">OTHERS</ListSubheader>

      <Link style={linkStyles} to="/settings">
        <ListItemButton>
          <ListItemDecorator>
            <SettingsIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Settings</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/account">
        <ListItemButton>
          <ListItemDecorator>
            <AccountBoxIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Account</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link style={linkStyles} to="/help">
        <ListItemButton>
          <ListItemDecorator>
            <HelpIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Aide</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <ListItemButton
        onClick={() => {
          //removeVerifiedUser();
        }}
      >
        <ListItemDecorator>
          <RefreshIcon />
        </ListItemDecorator>
        <ListItemContent>
          <Typography>TEST</Typography>
        </ListItemContent>
      </ListItemButton>
    </React.Fragment>
  )
}
