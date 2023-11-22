import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import { Tooltip } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import { useNavigate } from 'react-router-dom';


export default function DetailsLeader({ leaderDetails }) {


    const navigate = useNavigate();


    if (leaderDetails === null) {
        return (
            <text style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</text>
        );
    } else {
        return (
            <TableContainer component={Paper} style={{}}>
                <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
                    <text style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Détails</text>
                    <TableBody>
                        <TableRow key={leaderDetails.phone} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Numéro de téléphone" placement="top">
                                    <PhoneIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <text style={{ fontSize: '18px' }}>{leaderDetails.phone}</text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={leaderDetails.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <text style={{ fontSize: '18px' }}>{leaderDetails.email}</text>
                            </TableCell>
                        </TableRow>
                        <TableRow key={leaderDetails.website} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Age" placement="top">
                                    <CakeIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <text style={{ fontSize: '18px' }}>{leaderDetails.age + " ans"}</text>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Entreprises" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                {leaderDetails.company.company.map((entreprise, index) => (
                                    <span key={index} style={{ fontSize: '18px', cursor: 'pointer' }}>
                                        {index > 0 ? ', ' : ''}
                                        <text
                                            onClick={() => {
                                                navigate(`/search/${entreprise}`, {
                                                    state: {
                                                        searchTerm: entreprise
                                                    }
                                                });
                                            }}
                                        >
                                            {entreprise}
                                        </text>
                                    </span>
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
