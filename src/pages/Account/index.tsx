import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Account from '../../components/Account';
import useAuthStore from '../../store/authStore';
import { useEffect } from 'react';
import ViewInvoices from '../Purchasing/invoice';
import { Grid } from '@mui/material';

export default function AccountPage() {

  const [currentTab, setCurrentTab] = React.useState(0);
  const { authUser } = useAuthStore();

  const handleTabChange = (event: any, newValue: any) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    console.log("fetching data")
    console.log("fetching data done")
  }, []);

  return (
    <Grid sx={{ display: 'flex' }}>
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

        {currentTab === 0 && <Account />} {/* Afficher le composant Paiements */}
        {currentTab === 1 && <ViewInvoices />} {/* Afficher le composant Factures */}

        {/* Ajoutez le contenu pour d'autres onglets ici */}
      </Box>
    </Grid>
  );
}