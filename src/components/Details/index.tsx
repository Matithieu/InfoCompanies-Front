import * as React from 'react';
import { Text } from 'recharts';
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

export default function Details({ companyDetails }) {
    if (companyDetails === null) {
        return (
            <a style={{ fontSize: '19px', fontFamily: 'Poppins', marginTop:5 }}>Veuillez sélectionner une entreprise</a>
        );
    } else {
        return (
            <TableContainer component={Paper} style={{ borderRadius: 9 }}>
                <Text style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Détails</Text>
                <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
                    <TableBody>
                        <TableRow key={companyDetails.phone} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Numéro de téléphone" placement="top">
                                    <PhoneIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <Text style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{companyDetails.phone}</Text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={companyDetails.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <Text style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{companyDetails.email}</Text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={companyDetails.website} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Site web" placement="top">
                                    <WebAssetIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <Text style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{companyDetails.website}</Text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={companyDetails.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <Text style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{companyDetails.address}</Text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={companyDetails.creationDate} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Date de création" placement="top">
                                    <CalendarTodayOutlinedIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <Text style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{companyDetails.creationDate}</Text>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
