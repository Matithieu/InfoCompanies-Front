import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Text } from 'recharts';

export default function ListOfLeaders({ companyLeaders }) {
    const navigate = useNavigate();

    function createData(nom, dateNaissance) {
        return { nom, dateNaissance };
    }

    function insertData(companyCharts) {
        const data: any[] = [];

        if (companyCharts && companyCharts.leaders) {
            const leadersData = companyCharts.leaders;
            const noms = leadersData.nom;
            const datesNaissance = leadersData.dateNaissance;

            for (let i = 0; i < noms.length; i++) {
                data.push(createData(noms[i], datesNaissance[i]));
            }
        }

        return data;
    }

    const rows = insertData(companyLeaders);

    if (companyLeaders === null) {
        return (
            <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>
        );
    } else {
        return (
            <TableContainer component={Paper} style={{ borderRadius: 9 }} >
                <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center', marginTop:5 }}>Liste des dirigeants</a>
                <Table sx={{ minWidth: 220 }} aria-label="List Of Leaders">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.nom}
                                onClick={() => {
                                    navigate(`/leaders/${row.nom}`);
                                }}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: (theme) => theme.palette.action.hover },
                                    cursor: 'pointer',
                                }}
                            >
                                <TableCell align="left">
                                    <AccountCircleIcon />
                                </TableCell>
                                <TableCell component="th" scope="row" style={{
                                    fontFamily: 'Poppins',
                                }}>
                                    {row.nom}
                                </TableCell>
                                <TableCell align="center" style={{
                                    fontFamily: 'Poppins',
                                }}>{row.dateNaissance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
