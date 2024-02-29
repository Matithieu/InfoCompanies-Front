import { Box, Card, Grid, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart/index.tsx";
import Details from "../../components/Details/index.tsx";
import ListOfLeaders from "../../components/ListOfLeaders/index.tsx";
import { TableSkeleton } from "../../components/Skeleton/index.tsx";
import TableCompany from "../../components/TableCompany/index.tsx";
import { columnsTableCompany } from "../../data/columns.ts";

export default function Favorites() {
  const [url, setUrl] = useState<string>("");
  const [checkedCompanies, setCheckedCompanies] = useState<Array<string>>([]);

  useEffect(() => {
    const idsOfCheckedCompanies: Array<string> = JSON.parse(
      localStorage.getItem("checkedToDo") || "[]"
    );
    setCheckedCompanies(idsOfCheckedCompanies);

    setUrl(`api/v1/companies-by-ids?ids=${idsOfCheckedCompanies}&`);
    console.log(
      "url: ",
      `api/v1/companies-by-ids?ids=${idsOfCheckedCompanies}&`
    );
  }, []);

  return (
    <Grid>
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography
          component="h1"
          level="h1"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Favoris
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        paddingLeft={8}
        paddingRight={10}
        alignItems="center"
      >
        <Grid xs={12} sm={6} md={8} lg={6}>
          {/* Container des éléments sur la première ligne */}
          <Grid
            container
            spacing={6}
          >
            {/* List Of Companies */}
            <Grid xs={12} md={8}>
              {checkedCompanies.length !== 0 ? (
                url ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 400,
                        minWidth: "70%",
                        maxHeight: 550,
                        borderRadius: 3,
                      }}
                    >
                      <TableCompany url={url} />
                    </Stack>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 200,
                        borderRadius: 3,
                        minWidth: "30%",
                        maxWidth: 400,
                      }}
                    >
                      <Details />
                    </Card>
                  </Box>
                ) : (
                  <TableSkeleton columns={columnsTableCompany} />
                )
              ) : (
                <h1
                  style={{
                    fontSize: "19px",
                    color: "#888",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  Aucun ToDO sélectionné
                </h1>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Container des éléments sur la deuxième ligne */}
        {checkedCompanies.length !== 0 && (
          <>
            <Grid xs={12} md={12} lg={12}>
              <Grid container spacing={3} flexDirection={"row"} marginTop={5}>
                {/* Leaders of the company */}
                <Grid xs={12} md={6}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 220,
                      borderRadius: 3,
                      minWidth: 400,
                    }}
                  >
                    <Chart />
                  </Card>
                </Grid>

                <Grid xs={12} md={6}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 220,
                      borderRadius: 3,
                    }}
                  >
                    <ListOfLeaders />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
