import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableCompany from '../../../components/TableCompany/index.tsx';
import Details from '../../../components/Details/index.tsx';
import { useState } from 'react';
import Chart from '../../../components/Chart/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import ChatGPT from '../../../components/ChatGPT/index.tsx';
import { useEffect } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

export default function Home() {

    const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);

    useEffect(() => {
        const savedCompanyDetails = JSON.parse(localStorage.getItem("companyDetailsFavorites") || "null");
        if (savedCompanyDetails) {
            setSelectedCompanyDetails(savedCompanyDetails);
        }
    }, []);

    // Enregistrer les données dans localStorage chaque fois qu'elles changent
    useEffect(() => {
        localStorage.setItem("companyDetailsFavorites", JSON.stringify(selectedCompanyDetails));
    }, [selectedCompanyDetails]);

    const handleDetailsClick = (companyDetails) => {
        // Faites quelque chose avec les détails de l'entreprise, par exemple :
        // Mettez à jour l'état local pour afficher les détails dans le composant "Details"
        setSelectedCompanyDetails(companyDetails);
    };

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
                <Typography fontFamily={"Poppins"} variant="h4" component="div" align="left" marginTop={5} marginLeft={10} marginBottom={5}>
                    Favoris
                </Typography>

                <Grid container spacing={3} paddingBottom={10} paddingLeft={10} paddingRight={10}>
                    <Grid item xs={12} md={12} lg={12}>

                        {/* Container des éléments sur la première ligne */}
                        <Grid container spacing={6} justifyContent="space-between" wrap="wrap">

                            {/* List Of Companies */}
                            <Grid item xs={12} md={8}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3
                                    }}
                                >
                                    <TableCompany onDetailsClick={handleDetailsClick} />
                                </Paper>
                            </Grid>

                            {/* Details of the company */}
                            <Grid item xs={12} md={4}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 200,
                                        borderRadius: 3
                                    }}
                                >
                                    <Details companyDetails={selectedCompanyDetails} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Container des éléments sur la deuxième ligne */}
                    <Grid item xs={12} md={12} lg={12}>

                        <Grid container spacing={3} justifyContent="space-between" marginTop={5}>
                            {/* Leaders of the company */}
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 220,
                                        borderRadius: 3
                                    }}
                                >
                                    <Chart companyCharts={selectedCompanyDetails} />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 220,
                                        borderRadius: 3
                                    }}
                                >
                                    <ListOfLeaders companyDetails={selectedCompanyDetails} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>

                        <Grid container spacing={3} justifyContent="space-between" marginTop={5}>
                            {/* Leaders of the company */}
                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 220,
                                        borderRadius: 3
                                    }}
                                >
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 220,
                                        borderRadius: 3
                                    }}
                                >
                                    <ChatGPT selectedValue={selectedCompanyDetails} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}