import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import Chart from "../../components/Chart/index.tsx";
import CustomSelect from "../../components/CustomSelect/index.tsx";
import Details from "../../components/Details/index.tsx";
import ListOfLeaders from "../../components/ListOfLeaders/index.tsx";
import SEO from "../../components/SEO/index.tsx";
import TableCompany from "../../components/TableCompany/index.tsx";
import { activityArea } from "../../data/ListOfOptions/Activity.tsx";
import { legalStatus } from "../../data/ListOfOptions/Legal.tsx";
import { region } from "../../data/ListOfOptions/Region.tsx";
import { useCompanyFilterStore } from "../../store/filtersStore.tsx";
import "./style.css";

/**
 *
 * @returns Multiple components to filter the list of companies
 */
const AdvancedSearch = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    legalStatusValue: [],
    activityAreaValue: [],
    regionValue: [],
  });

  const { searchParams, setSearchParams } = useCompanyFilterStore();

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

  const handleLegalStatusChange = (selectedValue: string[]) => {
    console.log("Legal status changed to:", selectedValue);
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      legalStatusValue: selectedValue as never[],
    }));
  };

  const handleActivityAreaChange = (selectedValue: string[]) => {
    console.log("Activity area changed to:", selectedValue);
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      activityAreaValue: selectedValue as never[],
    }));
  };

  const handleRegionChange = (selectedValue: string[]) => {
    console.log("Region changed to:", selectedValue);
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      regionValue: selectedValue as never[],
    }));
  };

  const handleSearch = () => {
    setSearchParams({
      legalStatus: searchTerm.legalStatusValue as [],
      activityArea: searchTerm.activityAreaValue as [],
      region: searchTerm.regionValue as [],
    });

    // Use the callback function to log the updated state
    setSearchTerm((prevSearchTerm) => {
      console.log("Search term:", prevSearchTerm);
      return prevSearchTerm;
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={toggleMenu}
        style={{ marginBottom: 30, marginTop: 20 }}
      >
        Recherche avancée
      </Button>
      <div className={`search-menu ${showMenu ? "show" : ""}`}>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          padding="10px"
        >
          <Grid xs={12} sm={6} md={4}>
            <CustomSelect
              options={legalStatus}
              onSelectionChange={handleLegalStatusChange}
              label="Status légaux"
              placeholder="Status légaux"
              selectedValues={searchTerm.legalStatusValue}
              value={searchTerm.legalStatusValue}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <CustomSelect
              options={activityArea}
              onSelectionChange={handleActivityAreaChange}
              label="Secteur d'activité"
              placeholder="Secteur d'activité"
              selectedValues={searchTerm.activityAreaValue}
              value={searchTerm.activityAreaValue}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <CustomSelect
              options={region}
              onSelectionChange={handleRegionChange}
              label="Région"
              placeholder="Région"
              selectedValues={searchTerm.regionValue}
              value={searchTerm.regionValue}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <Button
              onClick={() => {
                setSearchTerm({
                  legalStatusValue: [],
                  activityAreaValue: [],
                  regionValue: [],
                });
                setSearchParams({
                  legalStatus: [],
                  activityArea: [],
                  region: [],
                });
              }}
              variant="outlined"
              style={{ marginTop: "20px" }}
            >
              Réinitialiser
            </Button>

            <span style={{ marginRight: "20px" }}></span>

            <Button
              onClick={handleSearch}
              variant="soft"
              style={{ marginTop: "20px" }}
            >
              Rechercher <SearchIcon style={{ marginLeft: "6px" }} />
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
  const [url, setUrl] = useState(`api/v1/random-companies?`);

  useEffect(() => {
    const changeURL = () => {
      if (
        searchParams.activityArea.length == 0 &&
        searchParams.region.length == 0 &&
        searchParams.legalStatus.length == 0
      ) {
        setUrl("api/v1/random-companies?");
        return;
      }

      setUrl(
        `api/v1/companies?secteurActivite=${searchParams.activityArea}&region=${searchParams.region}&`
      );
    };

    changeURL();
  }, [searchParams]);
  return (
    <Grid sx={{}}>
      <SEO
        title="Dashboard"
        description="Dashboard"
        name="Dashboard"
        type="Dashboard"
      />
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography component="h1" level="h1" style={{ marginTop: 20 }}>
          Dashboard
        </Typography>
      </Box>

      <Grid xs={12} sm={6} md={4} lg={3} paddingLeft={8}>
        <AdvancedSearch />
      </Grid>

      <Grid
        container
        spacing={3}
        paddingLeft={8}
        paddingRight={10}
        justifyContent="center"
        alignItems="center"
      >
        {/* Container on the first row */}
        <Grid xs={12} sm={6} md={8} lg={6}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "100%",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 550,
              maxHeight: 550,
              borderRadius: 3,
            }}
          >
            <TableCompany url={url} />
          </Stack>
        </Grid>

        {/* Container on the second row */}
        <Grid container xs={12} spacing={3}>
          {/* Chart of the company */}
          <Grid xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 220,
                minWidth: 400,
                maxWidth: 400,
              }}
            >
              <Details />
            </Card>
          </Grid>

          {/* Leaders of the company */}
          <Grid xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 220,
                minWidth: 400,
              }}
            >
              <ListOfLeaders />
            </Card>
          </Grid>

          {/* Details of the company */}
          <Grid xs={12} sm={12} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 220,
                minWidth: 400,
              }}
            >
              <Chart />
            </Card>
          </Grid>
          {/* . */}
        </Grid>
      </Grid>
    </Grid>
  );
}
