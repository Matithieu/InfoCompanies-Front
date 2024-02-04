import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemContent,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/joy";
import * as React from "react";

import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { linkStyles } from "../../pages/Layout/ListItems/listItems";
import useAuthStore from "../../store/authStore";

/*
async function deleteSessionAPI() {
  const VITE_SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
  const response = await fetch(`${VITE_SERVER_ENDPOINT}/logout`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        console.log('Erreur : ' + response.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
*/

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const { setAuthUser, setRequestLoading } = useAuthStore();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "flex-end",
        }}
      >
        <Tooltip arrow title="Account settings">
          {/*ts-ignore*/}
          <IconButton onClick={handleClick} size="sm" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <Link to="/account" style={linkStyles}>
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>

        <Divider />

        <Link to="/settings" style={linkStyles}>
          <MenuItem onClick={handleClose}>
            <ListItemContent>
              <Settings fontSize="small" />
            </ListItemContent>
            Settings
          </MenuItem>
        </Link>
        <Link to="/login" style={linkStyles}>
          <MenuItem
            onClick={() => {
              handleClose();
              setRequestLoading(true);
              setAuthUser(null);
              setRequestLoading(false);
            }} /* Need to add function to clear session cache */
          >
            <ListItemContent>
              <Logout fontSize="small" />
            </ListItemContent>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
