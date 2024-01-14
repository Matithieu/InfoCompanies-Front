import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import TableCompany, { columns } from '../../components/TableCompany/index.tsx';
import Details from '../../components/Details/index.tsx';
import { useState } from 'react';
import Chart from '../../components/Chart/index.tsx';
import ListOfLeaders from '../../components/ListOfLeaders/index.tsx';
import { useEffect } from 'react';
import { TableSkeleton } from '../../components/Skeleton/index.tsx';

export default function Favorites() {
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const idsOfCheckedCompanies: Array<String> = JSON.parse(localStorage.getItem('checkedToDo') || '[]');
        //TODO: fetch the list of companies from the api using the sirensOfCheckedCompanies and then put it in setListOfCompanies
        console.log("idsOfCheckedCompanies ", idsOfCheckedCompanies);

        setUrl(`api/v1/companies-by-ids?ids=${idsOfCheckedCompanies}&`);
        console.log("url: ", `api/v1/companies-by-ids?ids=${idsOfCheckedCompanies}&`);
    }, []);

    return (
        <Grid >
            <CssBaseline />

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
                                {url ? <TableCompany url={url} /> : <TableSkeleton columns={columns} />}
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
                                <Details />
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
                                <Chart />
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
                                <ListOfLeaders />
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
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}