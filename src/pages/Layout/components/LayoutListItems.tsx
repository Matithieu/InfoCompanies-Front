import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PendingIcon from '@mui/icons-material/Pending'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
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

interface LayoutListItemsProps {
  open: boolean
}

const LayoutListItems: FC<LayoutListItemsProps> = ({ open }) => {
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
              <DashboardRoundedIcon
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.5rem' },
                }}
              />
              {open && (
                <ListItemContent>
                  <Typography level="body-md">Dashboard</Typography>
                </ListItemContent>
              )}
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() => {
                navigation.toFavorites()
              }}
            >
              <PendingIcon
                sx={{
                  fontSize: { xs: '1.5rem', md: 'inherit' },
                }}
              />
              {open && (
                <ListItemContent>
                  <Typography level="body-md">To&nbsp;Do</Typography>
                </ListItemContent>
              )}
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
            <ListItemButton
              onClick={() => {
                navigation.toSettings()
              }}
            >
              <SettingsRoundedIcon
                sx={{
                  fontSize: { xs: '1.5rem', md: 'inherit' },
                }}
              />
              {open && (
                <ListItemContent>
                  <Typography level="body-md">Paramètres</Typography>
                </ListItemContent>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <LayoutAvatarItem open={open} />
    </Fragment>
  )
}

export default LayoutListItems
