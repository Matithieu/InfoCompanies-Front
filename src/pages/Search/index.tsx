import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { Box, Button, Grid, Sheet, Table, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
    refetchOnWindowFocus: false,
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

  // const handleChangePage = (_event: unknown, newPage: number) => {
  //   setDataPagination((prevDataPagination) => ({
  //     ...prevDataPagination,
  //     page: newPage,
  //   }));
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setDataPagination((prevDataPagination) => ({
  //     ...prevDataPagination,
  //     rowsPerPage: +event.target.value,
  //     page: 0,
  //   }));
  // };

  if (error != null && isError) {
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "200px", // Set a fixed height for the container
        }}
      >
        <h1>{error.message}</h1>
        <Button
          variant="soft"
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
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "200px", // Set a fixed height for the container
        }}
      >
        <h1>Chargement des données...</h1>
      </div>
    );
  } else if (data.empty) {
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "200px", // Set a fixed height for the container
        }}
      >
        <h1>Aucune entreprise trouvée</h1>
      </div>
    );
  } else if (data.empty === false) {
    return (
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th align="left"></th>
              <th align="left">Dénomination</th>
              <th align="center">Secteur d'activité</th>
              <th align="center">Ville</th>
              <th align="center">Region</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((row: CompanyDetails) => (
              <tr
                key={row.id}
                onClick={() => {
                  navigate(`/company/${row.id}`, {});
                }}
                style={{ cursor: "pointer" }}
              >
                <td align="left">
                  <ApartmentOutlinedIcon />
                </td>
                <td scope="row">{row.denomination}</td>
                <td align="center">{row.secteurActivite}</td>
                <td align="center">{row.ville}</td>
                <td align="center">{row.region}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
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
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography component="h1" level="h1" style={{ marginTop: 20 }}>
          Entreprises pour {searchTerm}
        </Typography>
      </Box>
      <Grid
        container
        spacing={"3vh"}
        paddingBottom={"10vh"}
        paddingLeft={"10vh"}
        paddingRight={"10vh"}
        justifyContent="center"
      >
        <Grid xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 320,
              height: "100%",
              width: "100%",
              margin: "auto", // Center horizontally
            }}
          >
            <TableOfDetails />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
