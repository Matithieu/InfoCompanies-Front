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
import Leader from '../../data/leader';

export function toAgeFromDate(date: Date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export default function DetailsLeader({ leaderDetails }: { leaderDetails: Leader | null }) {

    const navigate = useNavigate();

    if (leaderDetails === null) {
        return (
            <tr style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</tr>
        );
    } else {
        return (
            <TableContainer component={Paper} style={{}}>
                <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
                    <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Détails</a>
                    <TableBody>
                        <TableRow key={leaderDetails.getPhone()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Numéro de téléphone" placement="top">
                                    <PhoneIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px' }}>{leaderDetails.getPhone()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow key={leaderDetails.getEmail()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px' }}>{leaderDetails.getEmail()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Age" placement="top">
                                    <CakeIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px' }}>{toAgeFromDate(leaderDetails.getDateNaissance()) + " ans"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Tooltip title="Entreprises" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                {leaderDetails.getListOfCompanies().map((company, index) => (
                                    <span key={index} style={{ fontSize: '18px', cursor: 'pointer' }}>
                                        {index > 0 ? ', ' : ''}
                                        <a
                                            onClick={() => {
                                                navigate(`/search/${company.id}`, {
                                                    state: {
                                                        searchTerm: company.id
                                                    }
                                                });
                                            }}
                                        >
                                            {company.denomination}
                                        </a>
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
