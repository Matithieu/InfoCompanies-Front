import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemContent,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
} from '@mui/joy'
import * as React from 'react'

import useAuthManager from '../../../hooks/useAuthManager'
import { linkStyles } from '../../../pages/Layout/ListItems/listItems'
import useAuthStore from '../../../store/authStore'
import { useAppNavigate } from '../../../utils/navigation/navigation'

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
  const { navigation } = useAppNavigate()
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
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'flex-end',
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
        <MenuButton
          style={linkStyles}
          onClick={() => {
            navigation.toAccount()
          }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </MenuButton>

        <Divider />

        <MenuButton
          style={linkStyles}
          onClick={() => {
            navigation.toSettings()
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemContent>
              <Settings fontSize="small" />
            </ListItemContent>
            Settings
          </MenuItem>
        </MenuButton>

        <MenuButton style={linkStyles} onClick={() => authManager.signIn()}>
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
        </MenuButton>
      </Menu>
    </React.Fragment>
  )
}
