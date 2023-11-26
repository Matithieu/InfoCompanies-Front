import React, { useState } from 'react';
import { CssBaseline, Typography, Grid, Paper, Box, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Chart from '../../../components/Chart/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import Details from '../../../components/Details/index.tsx';
import { useCompanyContext } from '../../../context/CompanyContext.tsx';

export default function CompanyPage() {
  const { selectedCompany, setSelectedCompany } = useCompanyContext();

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Update 'favoris' property for each company
    const isFavorite = favorites.includes(selectedCompany?.getSiren());
    selectedCompany?.setFavoris(isFavorite);
    setSelectedCompany(selectedCompany);
  }, []);


  // TODO : Another function is in the file src/components/TableCompany/index.tsx
  const manageFavorites = (companySiren: string | undefined) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(companySiren);
    if (index === -1) {
      // Si l'entreprise n'est pas encore enregistrée en tant que favori, ajoutez-la
      favorites.push(companySiren);
    } else {
      // Sinon, supprimez-la
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favoris mis à jour:', favorites);

    // Mettez à jour l'état local companyData avec l'information des favoris
    const isFavorite = favorites.includes(selectedCompany?.getSiren());
    selectedCompany?.setFavoris(isFavorite);
    setSelectedCompany(selectedCompany);
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
          <div key={selectedCompany?.getSiren()} style={{}}>
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
                  manageFavorites(selectedCompany?.getSiren());
                }}
              >
                {selectedCompany?.getFavoris() ? <StarIcon /> : <StarBorderOutlinedIcon />}
              </Button>
              <Typography
                fontFamily="Poppins"
                variant="h4"
                align="left"
                marginTop={10}
                marginLeft={0}
                marginBottom={5}
              >
                {selectedCompany?.getDenomination()}
              </Typography>
            </div>

            <Grid>
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
                    <Details />

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
                    <ListOfLeaders />
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
                    <Chart />
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
      </Box>
    </Box >

  );
}
