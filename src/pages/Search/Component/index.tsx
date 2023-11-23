import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../../../components/Title/Title.tsx';
import { TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { company1, company2 } from '../../../components/TableCompany/index.tsx';

// TODO: Replace this with the data from the API
const initialCompanyData = [
  company1,
  company2,
];

/**
 * 
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = location.state.searchTerm.toString();

  return (

    <TableContainer component={Paper} style={{ minWidth: 220, minHeight: 220, width: '100%', height: '100%', borderRadius: 10 }}>
      <Title>
        <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Liste entreprises pour {searchTerm}</a>
      </Title>
      <Table sx={{ borderRadius: 10 }} aria-label="List Of Leaders">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Dénomination</TableCell>
            <TableCell align="center">Secteur d'activité</TableCell>
            <TableCell align="center">Ville</TableCell>
            <TableCell align="center">Date d'immatriculation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialCompanyData.map((row) => (
            <TableRow
              key={row.getSiren()} // Change 'name' to 'nom'
              onClick={() => {
                navigate(`/company/${row.getSiren()}`, {
                  state: {
                    initialCompanyData: [row]
                  }
                });
              }}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { backgroundColor: (theme) => theme.palette.action.hover },
                cursor: 'pointer',
              }}
            >
              <TableCell align="left">
                <ApartmentOutlinedIcon />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.getDenomination()} {/* Change 'name' to 'nom' */}
              </TableCell>
              <TableCell align="center">{row.getSecteurDActivite()}</TableCell>
              <TableCell align="center">{row.getVille()}</TableCell>
              <TableCell align="center">{row.getDateImmatriculation()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * 
 * @returns The search page
 */
export default function Search() {
  if (initialCompanyData.length === 0) {
    return <div>Chargement des données...</div>;
  }
  else if (initialCompanyData.length == null) {
    return <div>Aucune entreprise trouvée</div>;
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
            Search
          </Typography>

          <Grid container spacing={'3vh'} paddingBottom={'10vh'} paddingLeft={'10vh'} paddingRight={'10vh'} justifyContent="center">


            <Grid container spacing={3} justifyContent="space-between" marginTop={5}>
              <Grid item xs={12} md={12} >
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 320,
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <TableOfDetails />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

    );
  }
}
