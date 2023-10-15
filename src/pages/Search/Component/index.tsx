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
import { Text } from 'recharts';

const initialCompanyData = [
  {
    favoris: false,
    denomination: "LA MIE'STERIEUSE",
    siren: "948404819",
    nic: "00013",
    forme_juridique: "Société par actions simplifiée",
    code_ape: "0000Z",
    secteur_d_activite: "EN INSTANCE DE CHIFFREMENT",
    adresse: "213 ROUTE DE MACORNAY",
    code_postal: "39000",
    ville: "LONS LE SAUNIER",
    num_dept: "39",
    departement: "Jura",
    region: "Bourgogne-Franche-Comté",
    code_greffe: "3902",
    greffe: "LONS-LE-SAUNIER",
    date_immatriculation: "2023-02-13",
    date_radiation: null,
    statut: "B",
    geolocalisation: {
      lon: 5.545786,
      lat: 46.667538,
    },
    phone: '06 00 00 00 00',
    email: "email@email.com",
    website: "www.website.com",
    address: "1 rue de la rue",
    creationDate: "01/01/2021",
    chiffreAffaire: {
      date: ["01/01/2021", "01/01/2022", "01/01/2023"],
      chiffreAffaire: ["10000", "20000", "30000"]
    },
    leaders: {
      nom: ["Jean", "Paul", "Jacques", "Pierre"],
      dateNaissance: ["01/01/2000", "02/02/2000", "03/03/2000", "04/04/2000"],
    }
  },
  {
    favoris: false,
    denomination: "Nom de l'entreprise 2",
    siren: "123456789",
    nic: "00001",
    forme_juridique: "Société anonyme",
    code_ape: "1234A",
    secteur_d_activite: "Service informatique",
    adresse: "123 Rue de l'Entreprise",
    code_postal: "12345",
    ville: "Ville Entreprise",
    num_dept: "12",
    departement: "Département Entreprise",
    region: "Région Entreprise",
    code_greffe: "6789",
    greffe: "Greffe Entreprise",
    date_immatriculation: "2022-01-01",
    date_radiation: "2023-03-03",
    statut: "A",
    geolocalisation: {
      lon: 12.345678,
      lat: 34.567890,
    },
    phone: '06 00 00 00 00',
    email: "email@gmail.com",
    website: "www.website.com",
    address: "1 rue de la rue",
    creationDate: "01/01/2021",
    chiffreAffaire: {
      date: ["01/01/2021", "01/01/2022", "01/01/2023"],
      chiffreAffaire: ["10000", "1000", "30000"]
    },
    leaders: {
      nom: ["Clément", "Mathieu", "Pierre"],
      dateNaissance: ["01/01/2000", "02/02/2000", "03/03/2000"],
    }
  },
  // Add more company data as needed...
];

function TableOfDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = location.state.searchTerm.toString();

  return (

    <TableContainer component={Paper} style={{ minWidth: 220, minHeight: 220, width: '100%', height: '100%', borderRadius: 10 }}>
      <Title>
        <Text style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Liste entreprises pour {searchTerm}</Text>
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
              key={row.siren} // Change 'name' to 'nom'
              onClick={() => {
                navigate(`/company/${row.siren}`, {
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
                {row.denomination} {/* Change 'name' to 'nom' */}
              </TableCell>
              <TableCell align="center">{row.secteur_d_activite}</TableCell>
              <TableCell align="center">{row.ville}</TableCell>
              <TableCell align="center">{row.date_immatriculation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


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
