import { Box, Grid } from '@mui/joy'
import { FC } from 'react'

import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage } from '../../services/intl/intl'
import AppearancePage from './Appearance'
import settingsMessages from './Settings.messages'

const SettingsPage: FC = () => {
  return (
    <Grid>
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <HeaderTitle text={formatMessage(settingsMessages.settings)} />
      </Box>

      <Tabs
        tabsContent={[
          <AppearancePage key={formatMessage(settingsMessages.appearance)} />,
        ]}
        tabsName={[formatMessage(settingsMessages.appearance)]}
      />
    </Grid>
  )
}

export default SettingsPage
