import {
  Box,
  Card,
  Divider,
  FormControl,
  Option,
  Select,
  Typography,
} from '@mui/joy'
import { FC, SyntheticEvent } from 'react'

import { changeAppLocales } from '../../containers/LocaleProvider/constants'
import {
  AppLocale,
  appLocaleNames,
} from '../../containers/LocaleProvider/types'
import { formatMessage } from '../../services/intl/intl'
import { StorageService } from '../../services/storage'
import { isNotNU } from '../../utils/assertion.util'
import ColorSchemeToggle from '../Layout/components/colorScheme'
import SettingsMessages from './Settings.messages'

const AppearancePage: FC = () => {
  const storage = new StorageService<AppLocale>('infocp-locale_')
  const languageAppLocale: AppLocale = storage.getItem('language') ?? 'fr-FR'

  const handleLanguageChange = (
    _event: SyntheticEvent | null,
    newLanguage: AppLocale,
  ) => {
    changeAppLocales({
      languageAppLocale: newLanguage,
    })
  }

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

        <FormControl sx={{ width: '100%' }}>
          <Select
            placeholder="Language"
            value={languageAppLocale}
            onChange={(event, newValue) => {
              if (isNotNU(newValue)) {
                handleLanguageChange(event, newValue)
              }
            }}
          >
            {Object.entries(appLocaleNames).map(([key, value]) => (
              <Option key={key} value={key}>
                {value}
              </Option>
            ))}
          </Select>
        </FormControl>
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
