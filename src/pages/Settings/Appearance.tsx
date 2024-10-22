import { Box, Card, Divider, Typography } from '@mui/joy'
import { FC } from 'react'

import ChangeLanguageSelect from '../../components/common/Select/ChangeLanguageSelect'
import { formatMessage } from '../../services/intl/intl'
import ColorSchemeToggle from '../Layout/components/colorScheme'
import SettingsMessages from './Settings.messages'

const AppearancePage: FC = () => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        variant="outlined"
      >
        <Typography gutterBottom component="h2" level="h4">
          {formatMessage(SettingsMessages.language)}
        </Typography>

        <ChangeLanguageSelect />
      </Card>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <Card
        sx={{
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        variant="outlined"
      >
        <Typography gutterBottom component="h2" level="h4">
          {formatMessage(SettingsMessages.appearance)}
        </Typography>
        <Box>
          <ColorSchemeToggle />
        </Box>
      </Card>
    </Box>
  )
}

export default AppearancePage
