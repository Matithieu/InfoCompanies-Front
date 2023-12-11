import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../../components/Chart/index.tsx';
import TableCompany, { initialCompanyData } from '../../../components/TableCompany/index.tsx';
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
import { Button } from '@mui/material';
import { listOfCompanies } from '../../../components/TableCompany/index.tsx';
import { loadCompaniesFilterFromLocalStorage } from '../../../utils/loadFilter.tsx';
import { useCompanyStore } from '../../../store/companyStore.tsx';

/**
 * 
 * @returns Multiple components to filter the list of companies
 */
const AdvancedSearch = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams, setSearchParams] = useState({
    // Définissez ici les paramètres de recherche par défaut ou utilisez un objet vide
    // Par exemple : keyword: '', minPrice: 0, maxPrice: 100
    legalStatus: '',
    activityArea: '',
    region: '',
  });

  const [legalStatusValue, setLegalStatusValue] = useState(searchParams.legalStatus);
  const [activityAreaValue, setActivityAreaValue] = useState(searchParams.activityArea);
  const [regionValue, setRegionValue] = useState(searchParams.region);

  useEffect(() => {
    const storedFilters = loadCompaniesFilterFromLocalStorage('companiesFilter');
    if (storedFilters) {
      setSearchParams(storedFilters);
      setLegalStatusValue(storedFilters.legalStatus);
      setActivityAreaValue(storedFilters.activityArea);
      setRegionValue(storedFilters.region);
    }
  }, []);

  const resetSearchParams = () => {
    setSearchParams({
      legalStatus: '',
      activityArea: '',
      region: '',
    });
    setLegalStatusValue('');
    setActivityAreaValue('');
    setRegionValue('');

    // Resetting localStorage
    localStorage.setItem('companiesFilter', JSON.stringify({}));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
    const companiesFilter = loadCompaniesFilterFromLocalStorage('companiesFilter');
    if (companiesFilter) {
      localStorage.setItem('companiesFilter', JSON.stringify(searchParams));
    }
  };

  return (
    <div style={{ marginLeft: 25, marginTop: 20, marginBottom: 20 }}>
      <Button variant='outlined' onClick={toggleMenu} style={{ borderRadius: 5, marginBottom: 30 }}>Recherche avancée</Button>
      <div className={`search-menu ${showMenu ? 'show' : ''}`}>
        <Grid container spacing={1} alignItems="center" justifyContent="flex-start" width="100%" padding="10px">
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={legalStatus}
              onSelectionChange={handleLegalStatusChange}
              label="Status légaux"
              placeholder="Status légaux"
              selectedValues={legalStatusValue}
              value={legalStatusValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={activityArea}
              onSelectionChange={handleActivityAreaChange}
              label="Secteur d'activité"
              placeholder="Secteur d'activité"
              selectedValues={activityAreaValue}
              value={activityAreaValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={regions}
              onSelectionChange={handleRegionChange}
              label="Région"
              placeholder="Région"
              selectedValues={regionValue}
              value={regionValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button onClick={resetSearchParams} variant='outlined' style={{ marginTop: '20px' }}>
              Réinitialiser
            </Button>

            <span style={{ marginRight: '20px' }}></span>

            <Button onClick={handleSearch} variant='contained' style={{ marginTop: '20px' }}>
              Rechercher <SearchIcon style={{ marginLeft: '6px' }} />
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>

  );
};

/**
 * 
 * @returns The dashboard page
 */
export default function Dashboard() {
  const { setSelectedCompany } = useCompanyStore();

  useEffect(() => {
    const savedCompanyDetails = JSON.parse(localStorage.getItem("companyDetailsDashboard") || "null");
    if (savedCompanyDetails) {
      setSelectedCompany(savedCompanyDetails);
    }
  }, []);

  // Enregistrer les données dans localStorage chaque fois qu'elles changent
  useEffect(() => {
    localStorage.setItem('companyDetailsDashboard', JSON.stringify(listOfCompanies));
  }, [listOfCompanies]);

  /**
   * 
   * @param companyDetails When the user clicks on a company, this function is called
   */
  const handleDetailsClick = (companyDetails) => {
    setSelectedCompany(companyDetails);
  };

  return (
    <Grid>
      <SEO
        title="Dashboard"
        description="Dashboard"
        name="Dashboard"
        type="Dashboard"
      />

      <CssBaseline />

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
            <TableCompany onDetailsClick={handleDetailsClick} listOfCompanies={initialCompanyData} />
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
                <Chart />
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
                <ListOfLeaders />
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
                <Details />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
