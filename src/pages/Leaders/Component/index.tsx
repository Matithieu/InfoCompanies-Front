import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import DetailsLeaders from '../../../components/DetailsLeader/index.tsx';
import Leader from '../../../data/leader.tsx';


const idTest = window.location.pathname.split("/")[2];
console.log(idTest);

// TODO: Replace this with the data from the API
// Fetch at /api/leaders/{id}

const leader1 = new Leader(
  1,
  "DUPONT",
  "Jean",
  new Date("1990-01-01"),
  " 06 00 00 00 00",
  "email@email.com",
  [
    { id: 1, denomination: "Entreprise 1" },
  ]
);

const initialLeaderData: Leader = leader1;

export default function LeaderDetails() {
  if (initialLeaderData == null) {
    return <div>Aucunes données trouvées</div>;
  }
  else {
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
          <Typography fontFamily={"Poppins"} variant="h4" component="div" align="left" marginTop={10} marginLeft={7} marginBottom={5}>
            {initialLeaderData.getNom()} {initialLeaderData.getPrenom()}
          </Typography>

          <Grid container spacing={'3vh'} paddingBottom={'10vh'} paddingLeft={'10vh'} paddingRight={'10vh'} justifyContent="center">

            <Grid container spacing={3} justifyContent="space-between" marginTop={5}>
              <Grid item xs={12} md={6} >
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    height: '100%',
                  }}
                >
                  <DetailsLeaders leaderDetails={initialLeaderData} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

    );
  }
}
