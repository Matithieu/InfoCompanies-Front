import {
  Container,
  Grid,
  Option,
  Select,
  Sheet,
  Switch,
  Typography,
} from '@mui/joy'
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
    <Container maxWidth="lg">
      <Typography
        component="div"
        level="h4"
        sx={{
          marginTop: 5,
          marginLeft: 10,
          marginBottom: 5,
          alignSelf: 'flex-start',
        }}
      >
        Settings
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          paddingBottom: '10vh',
          paddingLeft: '10vh',
          paddingRight: '10vh',
          justifyContent: 'center',
        }}
      >
        <Grid md={6} xs={12}>
          <Sheet
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 2,
            }}
          >
            <Typography gutterBottom level="h4">
              Language
            </Typography>
            <Select
              placeholder="Language"
              value={language ?? ''}
              onChange={handleChange}
            >
              <Option value="english">English</Option>
              <Option value="french">Français</Option>
              <Option value="espagnol">Español</Option>
            </Select>
          </Sheet>

          {/* Switch for notifications moved outside the Sheet */}
          <Typography gutterBottom level="h4">
            Notifications
          </Typography>
          <Switch
            checked={notificationsEnabled}
            onChange={handleNotificationsChange}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
