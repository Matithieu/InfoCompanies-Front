import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Tooltip } from '@mui/material';
import Company from '../../data/company';

export default function Details({ companyDetails } : { companyDetails: Company | null }) {
    const [details, setDetails] = React.useState<Company | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    console.log("Details: ", companyDetails);

    React.useEffect(() => {
        if (companyDetails !== null && companyDetails instanceof Company) {
            setDetails(companyDetails);
        } else {
            setDetails(null as unknown as Company);
        }
        setIsLoading(false);
    }, [companyDetails]);
    
    if (isLoading) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Chargement des données...</a>;
    }
    else if (details === null) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
    } else {
        return (
            <TableContainer style={{ borderRadius: 9 }}>
                <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Détails</a>
                <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Numéro de téléphone" placement="top">
                                    <PhoneIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{details?.getPhone()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{details?.getEmail()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Site web" placement="top">
                                    <WebAssetIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{details?.getWebsite()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{details?.getAddress()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Date de création" placement="top">
                                    <CalendarTodayOutlinedIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{details?.getCreationDate()}</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
