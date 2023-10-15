import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Settings() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [language, setLanguage] = React.useState('en');

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
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
                Appearance
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                    color="primary"
                  />
                }
                label="Dark Mode"
              />
            </Paper>
          </Grid>

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
                Sound
              </Typography>
              <Typography id="volume-slider" gutterBottom>
                Volume
              </Typography>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />
            </Paper>
          </Grid>

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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
