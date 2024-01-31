import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { Button, Grid, TableHead, TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title.tsx";
import { CompanyDetails, Page } from "../../data/companyDetails.tsx";
import { ErrorJwtAuth } from "../../data/errorAuthJwt.ts";
import useAuthStore from "../../store/authStore.tsx";

async function fetchCompanies(searchTerm: string, page: number) {
  const response = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/v1/search?name=${searchTerm}&page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data: Page<CompanyDetails> = await response.json();
    return data;
  } else {
    const error: ErrorJwtAuth = await response.json();
    if (response.status === 401) {
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

/**
 *
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {
  const navigate = useNavigate();

  const { setAuthUser, setRequestLoading } = useAuthStore();
  const { searchTerm } = useParams();

  const [dataPagniation, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companies", searchTerm, dataPagniation.page],
    queryFn: () => fetchCompanies(searchTerm ?? "", dataPagniation.page),
    retry: 1,
  });

  // Reset the page number to 0 when searchTerm changes
  useEffect(() => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: 0,
    }));
  }, [searchTerm]);

  // Update the total pages when data changes
  useEffect(() => {
    if (data != null) {
      setDataPagination((prevDataPagination) => ({
        ...prevDataPagination,
        totalPages: data.totalPages,
      }));
    }
  }, [data]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: newPage,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      rowsPerPage: +event.target.value,
      page: 0,
    }));
  };

  if (error != null && isError) {
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h1>{error.message}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setRequestLoading(true);
            setAuthUser(null);
            setRequestLoading(false);
          }}
        >
          Se reconnecter
        </Button>
      </div>
    );
  }
  if (isPending || data === undefined) {
    return <div>Chargement des données...</div>;
  } else if (data.empty) {
    return <div>Aucune entreprise trouvée</div>;
  } else if (data.empty === false) {
    return (
      <Box
        sx={{
          minWidth: 220,
          minHeight: 220,
          width: "100%",
          borderRadius: 3,
          overflow: "auto",
          height: "100%",
        }}
      >
        <TableContainer>
          <Table stickyHeader sx={{ borderRadius: 10 }}>
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
              {data.content.map((row: CompanyDetails) => (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    navigate(`/company/${row.id}`, {});
                  }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    cursor: "pointer",
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={dataPagniation.totalPages * dataPagniation.rowsPerPage}
          rowsPerPage={dataPagniation.rowsPerPage}
          page={dataPagniation.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  }
}

/**
 *
 * @returns The search page
 */
export default function Search() {
  const { searchTerm } = useParams();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Grid
          container
          spacing={"3vh"}
          paddingBottom={"10vh"}
          paddingLeft={"10vh"}
          paddingRight={"10vh"}
          justifyContent="center"
        >
          <Grid
            container
            spacing={3}
            justifyContent="space-between"
            marginTop={5}
          >
            <Grid item xs={12} md={12}>
              <Title>
                <a
                  style={{
                    display: "flex",
                    fontFamily: "Poppins",
                    justifyContent: "center",
                  }}
                >
                  Liste entreprises pour {searchTerm}
                </a>
              </Title>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 320,
                  height: "100%",
                  width: "100%",
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
