import React, { useState } from 'react';
import { CssBaseline, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Chart from '../../../components/Chart/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import Details from '../../../components/Details/index.tsx';
import Company from '../../../data/company.ts';

export default function CompanyPage() {
  const location = useLocation();
  const initialCompanyData: Array<Company> = location.state.initialCompanyData;
  const [companyData, setCompanyData] = useState<Array<Company>>(initialCompanyData);

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedCompanyData = initialCompanyData.map((company) => {
      // Update 'favoris' property for each company
      const isFavorite = favorites.includes(company.getSiren());
      company.setFavoris(isFavorite);
      return company; // Return the updated company object
    });
    setCompanyData(updatedCompanyData);
  }, []);


  // TODO : Another function is in the file src/components/TableCompany/index.tsx
  const manageFavorites = (companySiren: string) => {
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
    const updatedCompanyData = initialCompanyData.map((company) => {
      // Update 'favoris' property for each company
      const isFavorite = favorites.includes(company.getSiren());
      company.setFavoris(isFavorite);
      return company; // Return the updated company object
    });
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
        {companyData.map((company) => (
          <div key={company.getSiren()} style={{}}>
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
                  manageFavorites(company.getSiren());
                }}
              >
                {company.getFavoris() ? <StarIcon /> : <StarBorderOutlinedIcon />}
              </Button>
              <Typography
                fontFamily="Poppins"
                variant="h4"
                align="left"
                marginTop={10}
                marginLeft={0}
                marginBottom={5}
              >
                {company.getDenomination()}
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
                    <ListOfLeaders companyDetails={company} />
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
                    <Chart company={company} />
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
