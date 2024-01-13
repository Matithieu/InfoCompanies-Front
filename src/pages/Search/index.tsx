import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../../components/Title/Title.tsx';
import { TableHead, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import { useNavigate } from 'react-router-dom'; // Import from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CompanyDetails, Page } from '../../data/companyDetails.tsx';

/**
 * 
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {

  const navigate = useNavigate();
  const location = useLocation();

  const [companies, setCompanies] = useState<CompanyDetails[]>([]);
  const [dataPagniation, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  });

  const searchTerm = location.state.searchTerm.toString();
  console.log("Search term: ", searchTerm);

  const handleChangePage = (event: unknown, newPage: number) => {
    setDataPagination((prevDataPagination) => ({ ...prevDataPagination, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataPagination((prevDataPagination) => ({ ...prevDataPagination, rowsPerPage: +event.target.value, page: 0 }));
  };;

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/search?name=${searchTerm}&page=${dataPagniation.page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: Page<CompanyDetails> = await response.json();
      if (response.ok) {
        console.log("data: ", data);
        setCompanies(data.content);
        setDataPagination((prevDataPagination) => ({ ...prevDataPagination, totalPages: data.totalPages }));
        return data;
      }
      else {
        console.log("error: ", data);
        toast.error("Erreur lors de la récupération des entreprises", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des entreprises", {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    setCompanies(null as unknown as CompanyDetails[]);
    fetchCompanies();
    console.log(`${import.meta.env.VITE_SERVER_URL}/api/v1/search?name=${searchTerm}&page=${dataPagniation.page}`);
  }, [dataPagniation.page, searchTerm]);

  if (companies === null) {
    return <div>Chargement des données...</div>;
  }
  else if (companies.length == 0) {
    return <div>Aucune entreprise trouvée</div>;
  }
  else if (companies !== null) {
    return (
      <TableContainer style={{ minWidth: 220, minHeight: 220, width: '100%', height: '100%', borderRadius: 10 }}>
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
              <TableCell align="center">Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row: CompanyDetails) => (
              <TableRow
                key={row.id} // Change 'name' to 'nom'
                onClick={() => {
                  navigate(`/company/${row.id}`, {
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
                  {row.denomination}
                </TableCell>
                <TableCell align="center">{row.secteurActivite}</TableCell>
                <TableCell align="center">{row.ville}</TableCell>
                <TableCell align="center">{row.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[10]}
            count={dataPagniation.totalPages * dataPagniation.rowsPerPage}
            rowsPerPage={dataPagniation.rowsPerPage}
            page={dataPagniation.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    );
  }
}

/**
 * 
 * @returns The search page
 */
export default function Search() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
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