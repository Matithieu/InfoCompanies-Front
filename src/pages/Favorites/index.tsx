import { useEffect, useState } from "react"
import { Box, Card, Grid, Stack, Typography } from "@mui/joy"

import { TableSkeleton } from "../../components/common/Loaders/Skeleton/index.tsx"
import Chart from "../../components/parts/Chart/index.tsx"
import DetailsCompany from "../../components/parts/DetailsCompany/index.tsx"
import ListOfLeaders from "../../components/parts/ListOfLeaders/index.tsx"
import TableCompany from "../../components/parts/TableCompany/index.tsx"
import { columnsTableCompany } from "../../data/types/columns.ts"

export default function Favorites() {
  const [url, setUrl] = useState<string>("")
  const [checkedCompanies, setCheckedCompanies] = useState<Array<string>>([])

  useEffect(() => {
    const idsOfCheckedCompanies: Array<string> = JSON.parse(
      localStorage.getItem("checkedToDo") || "[]"
    )
    setCheckedCompanies(idsOfCheckedCompanies)

    setUrl(`get-by-ids?ids=${idsOfCheckedCompanies}&`)
  }, [])

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
        alignItems="center"
        paddingLeft={8}
        paddingRight={10}
        spacing={3}
      >
        <Grid lg={6} md={8} sm={6} xs={12}>
          {/* Container des éléments sur la première ligne */}
          <Grid container spacing={6}>
            {/* List Of Companies */}
            <Grid md={8} xs={12}>
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
                      <DetailsCompany />
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
        {checkedCompanies.length !== 0 ? (
          <>
            <Grid lg={12} md={12} xs={12}>
              <Grid container flexDirection="row" marginTop={5} spacing={3}>
                {/* Leaders of the company */}
                <Grid md={6} xs={12}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 220,
                      minWidth: 400,
                    }}
                  >
                    <Chart />
                  </Card>
                </Grid>

                <Grid md={6} xs={12}>
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
        ) : null}
      </Grid>
    </Grid>
  )
}
