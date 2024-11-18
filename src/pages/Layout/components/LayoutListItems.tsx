import Icon from '@/components/ui/icon'
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

import { formatMessage } from '../../../services/intl/intl'
import { useAppNavigate } from '../../../utils/navigation/navigation'
import layoutMessages from '../layout.messages'
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
              <Icon
                className="text-primary"
                color="hsl(var(--primary))"
                name="LayoutDashboard"
                size={24}
              />
              {open && (
                <ListItemContent>
                  <Typography level="body-md">
                    {formatMessage(layoutMessages.dashboard)}
                  </Typography>
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
              <Icon
                className="text-primary"
                color="hsl(var(--primary))"
                name="Waypoints"
                size={24}
              />
              {open && ( // If there a written space, it moves
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
              <Icon
                className="text-primary"
                color="hsl(var(--primary))"
                name="Settings"
                size={24}
              />
              {open && (
                <ListItemContent>
                  <Typography level="body-md">
                    {formatMessage(layoutMessages.settings)}
                  </Typography>
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
