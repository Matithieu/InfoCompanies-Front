import React from 'react';


import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import DetailsLeaders from '../../../components/DetailsLeader/index.tsx';


const initialLeaderData = {
    id: 1,
    nom : 'Jean',
    prenom: 'Dupont',
    phone: '06 12 34 56 78',
    email: 'email@email.com',
    age: 45,
    company: {
      company: ["Entreprise 1", "Entreprise 2", "Entreprise 3"],
      siren: [123456789, 987654321, 123456789],
    },

};

export default function Search() {
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
            {initialLeaderData.prenom} {initialLeaderData.nom}
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
