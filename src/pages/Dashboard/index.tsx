import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../components/Chart/index.tsx';
import TableCompany from '../../components/TableCompany/index.tsx';
import ListOfLeaders from '../../components/ListOfLeaders/index.tsx';
import Details from '../../components/Details/index.tsx';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useEffect } from 'react';
import SEO from '../../components/SEO/index.tsx';
import './style.css';
import CustomSelect from '../../components/CustomSelect/index.tsx';
import { activityArea } from '../../data/ListOfOptions/Activity.tsx';
import { legalStatus } from '../../data/ListOfOptions/Legal.tsx';
import { region } from '../../data/ListOfOptions/Region.tsx';
import { Button } from '@mui/material';
import { useCompanyFilterStore } from '../../store/filtersStore.tsx';

/**
 * 
 * @returns Multiple components to filter the list of companies
 */
const AdvancedSearch = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    legalStatusValue: '',
    activityAreaValue: '',
    regionValue: '',
  });

  const {
    searchParams,
    setSearchParams,
  } = useCompanyFilterStore();

  useEffect(() => {
    setSearchTerm({
      legalStatusValue: searchParams.legalStatus,
      activityAreaValue: searchParams.activityArea,
      regionValue: searchParams.region,
    });
  }, [searchParams]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLegalStatusChange = (selectedValue: any) => {
    console.log('Legal status changed to:', selectedValue);
    setSearchTerm((prevSearchTerm) => ({ ...prevSearchTerm, legalStatusValue: selectedValue }));
  };

  const handleActivityAreaChange = (selectedValue: any) => {
    console.log('Activity area changed to:', selectedValue);
    setSearchTerm((prevSearchTerm) => ({ ...prevSearchTerm, activityAreaValue: selectedValue }));
  };

  const handleRegionChange = (selectedValue: any) => {
    console.log('Region changed to:', selectedValue);
    setSearchTerm((prevSearchTerm) => ({ ...prevSearchTerm, regionValue: selectedValue }));
  };

  const handleSearch = () => {
    setSearchParams({
      legalStatus: searchTerm.legalStatusValue,
      activityArea: searchTerm.activityAreaValue,
      region: searchTerm.regionValue,
    });

    // Use the callback function to log the updated state
    setSearchTerm((prevSearchTerm) => {
      console.log('Search term:', prevSearchTerm);
      return prevSearchTerm;
    });
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
              selectedValues={searchTerm.legalStatusValue}
              value={searchTerm.legalStatusValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={activityArea}
              onSelectionChange={handleActivityAreaChange}
              label="Secteur d'activité"
              placeholder="Secteur d'activité"
              selectedValues={searchTerm.activityAreaValue}
              value={searchTerm.activityAreaValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              options={region}
              onSelectionChange={handleRegionChange}
              label="Région"
              placeholder="Région"
              selectedValues={searchTerm.regionValue}
              value={searchTerm.regionValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button onClick={() => {
              setSearchTerm({
                legalStatusValue: '',
                activityAreaValue: '',
                regionValue: '',
              });
              setSearchParams({
                legalStatus: '',
                activityArea: '',
                region: '',
              });
            }} variant='outlined' style={{ marginTop: '20px' }}>
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
  const { searchParams } = useCompanyFilterStore();
  const [url, setUrl] = useState<string>(`api/v1/companies?secteurActivite=${searchParams.activityArea}&region=${searchParams.region}`);

  useEffect(() => {
    if(searchParams.activityArea === '' && searchParams.region === '') {
      setUrl('api/v1/random-companies?');
      return;
    }
    setUrl(`api/v1/companies?secteurActivite=${searchParams.activityArea}&region=${searchParams.region}&`);
  }, [searchParams]);

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
              minHeight: 500,
              maxHeight: 550,
              borderRadius: 3,
            }}
          >
            <TableCompany url={url} />
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
