import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PendingIcon from '@mui/icons-material/Pending'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { Box, Divider, List } from '@mui/joy'
import { FC, Fragment } from 'react'

import { useAppNavigate } from '../../../../hooks/useAppNavigate'
import { formatMessage } from '../../../../services/intl/intl'
import layoutMessages from '../../layout.messages'
import LayoutAvatarItem from '../LayoutAvatarItem'
import LayoutItem from './LayoutItem'

interface LayoutListItemsProps {
  open: boolean
}

const LayoutListItems: FC<LayoutListItemsProps> = ({ open }) => {
  const { navigation } = useAppNavigate()

  return (
    <Fragment>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List
          size="sm"
          sx={{
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <LayoutItem
            icon={<DashboardRoundedIcon />}
            navigation={() => navigation.toDashboard()}
            open={open}
            title={formatMessage(layoutMessages.dashboard)}
          />

          <LayoutItem
            icon={<PendingIcon />}
            navigation={() => navigation.toFavorites()}
            open={open}
            title="To Do"
          />

          <LayoutItem
            icon={<AutoAwesomeIcon />}
            navigation={() => navigation.toAi()}
            open={open}
            title="Ai"
          />
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
          }}
        >
          <LayoutItem
            icon={<SettingsRoundedIcon />}
            navigation={() => navigation.toSettings()}
            open={open}
            title={formatMessage(layoutMessages.settings)}
          />
        </List>
      </Box>
      <Divider />
      <LayoutAvatarItem open={open} />
    </Fragment>
  )
}

export default LayoutListItems
