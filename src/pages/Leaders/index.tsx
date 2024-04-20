import { Box, Grid, Sheet, Typography } from "@mui/joy";
import DetailsLeaders from "../../components/DetailsLeader/index.tsx";
import { Leader } from "../../data/types/leader.ts";

const idTest = window.location.pathname.split("/")[2];
console.log("Leader id : " + idTest);

// TODO: Replace this with the data from the API
// Fetch at /api/leaders/{id}

const leader1: Leader = {
  id: 1,
  lastName: "DUPONT",
  firstName: "Jean",
  dateOfBirth: new Date("1990-01-01"),
  phone: "06 00 00 00 00",
  email: "email@email.com",
  listOfCompanies: [{ id: 1, name: "Entreprise 1" }],
};

const initialLeaderData: Leader = leader1;

export default function LeaderDetails() {
  if (initialLeaderData == null) {
    return <a>Aucunes données trouvées</a>;
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <Box component="main">
          <Typography
            level="h4"
            component="div"
            sx={{
              marginTop: 5,
              marginLeft: 10,
              marginBottom: 5,
              alignSelf: "flex-start",
            }}
          >
            {initialLeaderData.lastName} {initialLeaderData.firstName}
          </Typography>

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
              <Grid xs={12} md={6}>
                <Sheet
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 200,
                    height: "100%",
                  }}
                >
                  <DetailsLeaders leaderDetails={initialLeaderData} />
                </Sheet>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}
