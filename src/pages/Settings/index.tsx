import { Grid, Option, Select, Typography } from '@mui/joy'
import { FC, SyntheticEvent, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'

const SettingsPage: FC = () => {
  const [language, setLanguage] = useState('English')

  const handleChange = (
    _event: SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setLanguage(newValue as string)
  }

  return (
    <Grid sx={{ px: { xs: 2, md: 6 } }}>
      <HeaderTitle text="Settings" />
      <Typography level="body-md">Work in progres !!</Typography>

      <Grid container display="flex" flexDirection="row" gap={20} width="100%">
        <Grid md={6} xs={12}>
          <Typography level="h4">Language</Typography>
          <Select
            placeholder="Language"
            sx={{ width: '100%' }}
            value={language ?? ''}
            onChange={handleChange}
          >
            <Option value="english">English</Option>
            <Option value="french">Français</Option>
            <Option value="espagnol">Español</Option>
          </Select>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SettingsPage
