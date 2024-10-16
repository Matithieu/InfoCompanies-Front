import { Grid, Option, Select, Typography } from '@mui/joy'
import { FC, SyntheticEvent } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { changeAppLocales } from '../../containers/LocaleProvider/constants'
import {
  AppLocale,
  appLocaleNames,
} from '../../containers/LocaleProvider/types'
import commonMessages from '../../services/intl/common.messages'
import { formatMessage } from '../../services/intl/intl'
import { StorageService } from '../../services/storage'
import { isNotNU } from '../../utils/assertion.util'
import ColorSchemeToggle from '../Layout/components/colorScheme'
import SettingsMessages from './Settings.messages'

const SettingsPage: FC = () => {
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
    <Grid sx={{ px: { xs: 2, md: 6 } }}>
      <HeaderTitle text={formatMessage(SettingsMessages.settings)} />
      <Typography level="body-md">
        {formatMessage(commonMessages.workInProgress)}
      </Typography>

      <Grid container display="flex" flexDirection="row" gap={20} width="100%">
        <Grid md={6} xs={12}>
          <Typography level="h4">
            {formatMessage(SettingsMessages.language)}
          </Typography>
          <Select
            placeholder="Language"
            sx={{ width: '100%' }}
            value={languageAppLocale}
            onChange={(_event, newValue) => {
              if (isNotNU(newValue)) {
                handleLanguageChange(null, newValue)
              }
            }}
          >
            {Object.entries(appLocaleNames).map(([key, value]) => (
              <Option key={key} value={key}>
                {value}
              </Option>
            ))}
          </Select>
        </Grid>
      </Grid>

      <ColorSchemeToggle />
    </Grid>
  )
}

export default SettingsPage
