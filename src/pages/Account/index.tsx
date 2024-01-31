import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Account from "../../components/Account";
import useAuthStore from "../../store/authStore";
import ViewInvoices from "../Purchasing/invoice";

export default function AccountPage() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const { authUser, requestLoading } = useAuthStore();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (requestLoading ) {
    return <div>Chargement...</div>;
  }
  else {
    return (
      <Grid sx={{ display: "flex" }}>
        <Box>
          <Typography
            fontFamily="Poppins"
            variant="h4"
            component="div"
            align="left"
            marginTop={10}
            marginLeft={10}
            marginBottom={5}
          >
            Bienvenue, {authUser?.name}
          </Typography>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <Tab label="Profil" />
            <Tab label="Factures" />
            {/* Ajoutez d'autres onglets ici */}
          </Tabs>
          {currentTab === 0 && <Account />}{" "}
          {/* Afficher le composant Paiements */}
          {currentTab === 1 && <ViewInvoices />}
          {/* Afficher le composant Factures */}
          {/* Ajoutez le contenu pour d'autres onglets ici */}
        </Box>
      </Grid>
    );
  }
}
