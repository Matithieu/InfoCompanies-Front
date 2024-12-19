import { FormControl, Option, Select } from '@mui/joy'
import { FC, SyntheticEvent } from 'react'

import { changeAppLocales } from '../../../containers/LocaleProvider/constants'
import {
  AppLocale,
  appLocaleNames,
} from '../../../containers/LocaleProvider/types'
import { StorageService } from '../../../services/storage'
import { isNotNU } from '../../../utils/assertion.util'

const ChangeLanguageSelect: FC = () => {
  const storage = new StorageService<AppLocale>()
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
  )
}

export default ChangeLanguageSelect
