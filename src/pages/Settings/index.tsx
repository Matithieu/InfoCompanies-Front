import { Grid, Option, Select, Switch, Typography } from '@mui/joy'
import * as React from 'react'

export default function Settings() {
  const [language, setLanguage] = React.useState('English')
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true)

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setLanguage(newValue as string)
  }

  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNotificationsEnabled(event.target.checked)
  }

  return (
    <Grid container spacing={3} sx={{ px: { xs: 2, md: 6 } }}>
      <Grid xs={12}>
        <Typography component="h1" level="h1" sx={{ mt: 2, mb: 2 }}>
          Settings
        </Typography>
        <Typography level="body-md">Work in progres !!</Typography>
      </Grid>

      <Grid container display="flex" flexDirection="column" width="100%">
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
        <Grid md={6} xs={12}>
          <Typography level="h4">Notifications</Typography>
          <Switch
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
