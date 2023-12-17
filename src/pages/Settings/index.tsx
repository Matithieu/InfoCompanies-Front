import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/material';

export default function Settings() {
  const [language, setLanguage] = React.useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true); // State for notifications switch

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleNotificationsChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />

      <Typography
        fontFamily="Poppins"
        variant="h4"
        component="div"
        align="left"
        marginTop={10}
        marginLeft={10}
        marginBottom={5}
      >
        Settings
      </Typography>

      <Grid
        container
        spacing={3}
        paddingBottom={'10vh'}
        paddingLeft={'10vh'}
        paddingRight={'10vh'}
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Language
            </Typography>
            <Select
              label="Language"
              value={language}
              onChange={handleLanguageChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </Paper>

          {/* Switch for notifications moved outside the paper */}
          <FormControlLabel
            control={
              <Switch
                checked={notificationsEnabled}
                onChange={handleNotificationsChange}
              />
            }
            label="Enable Notifications"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
