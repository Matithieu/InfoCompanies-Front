import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PendingIcon from '@mui/icons-material/Pending'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Typography,
} from '@mui/joy'
import { FC, Fragment } from 'react'

import { useAppNavigate } from '../../../utils/navigation/navigation'
import LayoutAvatarItem from './LayoutAvatarItem'

const LayoutListItems: FC = () => {
  const { navigation } = useAppNavigate()

  return (
    <Fragment>
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
                <Typography level="body-md">Dashboard</Typography>
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
                <Typography level="body-md">To Do</Typography>
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
          <ListItem sx={{ display: 'none' }}>
            <ListItemButton>
              <SupportRoundedIcon />
              <Typography level="body-md">Support</Typography>
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
                <Typography level="body-md">Settings</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <LayoutAvatarItem />
    </Fragment>
  )
}

export default LayoutListItems
