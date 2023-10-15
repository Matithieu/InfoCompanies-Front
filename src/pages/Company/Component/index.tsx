import React, { useState } from 'react';
import { CssBaseline, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Chart from '../../../components/Chart/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import Details from '../../../components/Details/index.tsx';

export default function Company() {
  const location = useLocation();
  const initialCompanyData = location.state.initialCompanyData;
  const [companyData, setCompanyData] = useState(initialCompanyData);

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedCompanyData = initialCompanyData.map((company) => ({
      ...company,
      favoris: favorites.includes(company.denomination),
    }));
    setCompanyData(updatedCompanyData);
  }, 
  // eslint-disable-next-line
  []);

  const manageFavorites = (companyName) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(companyName);
    if (index === -1) {
      favorites.push(companyName);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favoris mis à jour:', favorites);

    const updatedCompanyData = companyData.map((company) => ({
      ...company,
      favoris: favorites.includes(company.denomination),
    }));
    setCompanyData(updatedCompanyData);
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
        {companyData.map((company, index) => (
          <div key={index} style={{}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <Button
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 10,
                  marginBottom: -30,
                }}
                onClick={() => {
                  manageFavorites(company.denomination);
                }}
              >
                {company.favoris ? <StarIcon /> : <StarBorderOutlinedIcon />}
              </Button>
              <Typography
                fontFamily="Poppins"
                variant="h4"
                align="left"
                marginTop={10}
                marginLeft={0}
                marginBottom={5}
              >
                {company.denomination}
              </Typography>
            </div>

            <Grid xs={8} md={4}  >
              <Grid container spacing={3} justifyContent="center" marginTop={5}>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 220,
                    }}
                  >
                    <Details companyDetails={company} />

                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 220,
                    }}
                  >
                    <ListOfLeaders companyLeaders={company} />
                  </Paper>
                </Grid>

              </Grid>
              <Grid container spacing={3} justifyContent="center" marginTop={5}>
                <Grid item xs={8} md={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 220,
                    }}
                  >
                    <Chart companyCharts={company} />
                  </Paper>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 220,
                    }}
                  >
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
    </Box >

  );
}
