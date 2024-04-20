import * as React from "react"
import { Link } from "react-router-dom"
import Logout from "@mui/icons-material/Logout"
import Settings from "@mui/icons-material/Settings"
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemContent,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/joy"

import useAuthManager from "../../../hooks/useAuthManager"
import { linkStyles } from "../../../pages/Layout/ListItems/listItems"
import useAuthStore from "../../../store/authStore"

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
  >(null)
  const authManager = useAuthManager()
  const { setAuthUser, setRequestLoading } = useAuthStore()
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <IconButton size="sm" sx={{ ml: 2 }} onClick={handleClick}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClick={handleClose}
        onClose={handleClose}
      >
        <Link style={linkStyles} to="/account">
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>

        <Divider />

        <Link style={linkStyles} to="/settings">
          <MenuItem onClick={handleClose}>
            <ListItemContent>
              <Settings fontSize="small" />
            </ListItemContent>
            Settings
          </MenuItem>
        </Link>
        <div style={linkStyles} onClick={() => authManager.redirectedLogin()}>
          <MenuItem
            onClick={() => {
              handleClose()
              setRequestLoading(true)
              setAuthUser(null)
              setRequestLoading(false)
            }} /* Need to add function to clear session cache */
          >
            <ListItemContent>
              <Logout fontSize="small" />
            </ListItemContent>
            Logout
          </MenuItem>
        </div>
      </Menu>
    </React.Fragment>
  )
}
