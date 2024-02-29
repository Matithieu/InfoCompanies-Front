import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpIcon from "@mui/icons-material/Help";
import LayersIcon from "@mui/icons-material/Layers";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
  Typography,
} from "@mui/joy";
import * as React from "react";
import { Link } from "react-router-dom";
/*
import useAuthStore from '../../../store/authStore';
import { User } from '../../../data/user';
import { useState } from 'react';
*/
//import Cookies from 'js-cookie';

// Styles CSS pour supprimer le surlignage bleu des liens
export const linkStyles = {
  textDecoration: "none", // Supprime la décoration de texte
  outline: "none", // Supprime le surlignage bleu
  color: "inherit", // Garde la couleur du texte par défaut
};

//A chaque fois que l'on clique sur un lien, on vérifie si le lien est le même que celui de la page actuelle
//Si oui, on renvoie true, sinon false

export const MainListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div">
        <Typography
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          MENU
        </Typography>
      </ListSubheader>

      <Link to="/dashboard" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <DashboardIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Dashboard</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/favorites" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <FavoriteIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Favoris</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/analytics" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <AnalyticsIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Outils d'analyse</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/reports" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <BarChartIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Reports</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/integrations" style={linkStyles}>
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
  );
};

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

      <Link to="/settings" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <SettingsIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Settings</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/account" style={linkStyles}>
        <ListItemButton>
          <ListItemDecorator>
            <AccountBoxIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography>Account</Typography>
          </ListItemContent>
        </ListItemButton>
      </Link>

      <Link to="/help" style={linkStyles}>
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
  );
};
