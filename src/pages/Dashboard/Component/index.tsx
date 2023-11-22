import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../../components/Chart/index.tsx';
import TableCompany from '../../../components/TableCompany/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import Details from '../../../components/Details/index.tsx';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import SEO from '../../../components/SEO/index.tsx';
import './style.css';
import CustomSelect from '../../../components/CustomSelect/index.tsx';
import { activityArea } from '../../../data/ListOfOptions/Activity.tsx';
import { legalStatus } from '../../../data/ListOfOptions/Legal.tsx';
import { regions } from '../../../data/ListOfOptions/Regions.tsx';
import { Button, Stack } from '@mui/material';

const AdvancedSearch = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams, setSearchParams] = useState({
    // Définissez ici les paramètres de recherche par défaut ou utilisez un objet vide
    // Par exemple : keyword: '', minPrice: 0, maxPrice: 100
    legalStatus: '',
    activityArea: '',
    region: '',
  });

  const [legalStatusValue, setLegalStatusValue] = useState('' || []);
  const [activityAreaValue, setActivityAreaValue] = useState('');
  const [regionValue, setRegionValue] = useState('');


  const toggleMenu = () => {
    setShowMenu(!showMenu);
    //Garde en mémoire les valeurs de handleLegalStatusChange, handleActivityAreaChange et handleRegionChange
  };

  const handleLegalStatusChange = (selectedValue) => {
    console.log('Legal status changed to:', selectedValue);
    setSearchParams({ ...searchParams, legalStatus: selectedValue });
    setLegalStatusValue(selectedValue);
  };

  const handleActivityAreaChange = (selectedValue) => {
    console.log('Activity area changed to:', selectedValue);
    setSearchParams({ ...searchParams, activityArea: selectedValue });
    setActivityAreaValue(selectedValue);
  };

  const handleRegionChange = (selectedValue) => {
    console.log('Region changed to:', selectedValue);
    setSearchParams({ ...searchParams, region: selectedValue });
    setRegionValue(selectedValue);
  };

  const handleSearch = () => {
    // Ici, vous pouvez envoyer les paramètres de recherche au backend
    console.log('Paramètres de recherche:', searchParams);
  };

  return (
    <div style={{ marginLeft: 25, marginTop: 20, marginBottom: 20 }}>
      <Button className="buttonlist" variant='outlined' onClick={toggleMenu} style={{ borderRadius: 5, marginBottom: 30 }}>Recherche avancée</Button>
      <div className={`search-menu ${showMenu ? 'show' : ''}`}>
        <Grid container spacing={1} alignItems="center" justifyContent="flex-start" width="100%" padding="10px">
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={legalStatus}
              onSelectionChange={handleLegalStatusChange}
              label="Status légaux"
              placeholder="Status légaux"
              selectedValues={legalStatusValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={activityArea}
              onSelectionChange={handleActivityAreaChange}
              label="Secteur d'activité"
              placeholder="Secteur d'activité"
              selectedValues={activityAreaValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={regions}
              onSelectionChange={handleRegionChange}
              label="Région"
              placeholder="Région"
              selectedValues={regionValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button onClick={handleSearch} variant='outlined'>
              Valider
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>

  );
};

export default function Company() {

  const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);

  useEffect(() => {

    const savedCompanyDetails = JSON.parse(localStorage.getItem("companyDetailsDashboard") || "null");
    if (savedCompanyDetails) {
      setSelectedCompanyDetails(savedCompanyDetails);
    }
  }, []);

  // Enregistrer les données dans localStorage chaque fois qu'elles changent
  useEffect(() => {
    localStorage.setItem('companyDetailsDashboard', JSON.stringify(selectedCompanyDetails));
  }, [selectedCompanyDetails]);

  const handleDetailsClick = (companyDetails) => {
    // Faites quelque chose avec les détails de l'entreprise, par exemple :
    // Mettez à jour l'état local pour afficher les détails dans le composant "Details"
    setSelectedCompanyDetails(companyDetails);
    console.log(companyDetails);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SEO
        title="Dashboard"
        description="Dashboard"
        name="Dashboard"
        type="Dashboard"
      />

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
        <Typography fontFamily={"Poppins"} variant="h4" component="div" align="left" marginTop={5} marginLeft={10} marginBottom={5}>
          Dashboard
        </Typography>

        <Grid container spacing={3} paddingBottom={10} paddingLeft={10} paddingRight={10}>
          <AdvancedSearch />
          {/* List Of Companies */}
          <Grid item xs={12} md={12} lg={12} >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'auto',
                borderRadius: 3,
                // Modifier aussi la valeur dans TableCompany/index.tsx
              }}
            >
              <TableCompany onDetailsClick={handleDetailsClick} />
            </Paper>
          </Grid>

          {/* Container des éléments sur la deuxième ligne */}
          <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={3} justifyContent="center" marginTop={5}>

              {/* Chart of the company */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 220,
                    borderRadius: 3,

                  }}
                >
                  <Chart companyCharts={selectedCompanyDetails} />
                </Paper>
              </Grid>

              {/* Leaders of the company */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                    borderRadius: 3
                  }}
                >
                  <ListOfLeaders companyLeaders={selectedCompanyDetails} />
                </Paper>
              </Grid>

              {/* Details of the company */}
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                    borderRadius: 3
                  }}
                >
                  <Details companyDetails={selectedCompanyDetails} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
