import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Leader from '../../data/leader';
import Company from '../../data/company';
import { useState } from 'react';

/**
 * 
 * @param companyDetails Takes a company as a parameter and displays its leaders in a table when selected
 * @returns A table of leaders
 */
export default function ListOfLeaders({ companyDetails }: { companyDetails: Company | null }) {
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState<Leader[]>(null as unknown as Leader[]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        if (companyDetails !== null && companyDetails instanceof Company && typeof companyDetails.getLeaders === 'function') {
            setLeaders(companyDetails.getLeaders());
        } else {
            setLeaders(null as unknown as Leader[]);
        }
        setIsLoading(false);
    }, [companyDetails]);

    if (isLoading) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Chargement des données...</a>;
    } else if (leaders?.length === 0) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
    } else {
        return (
            <TableContainer style={{ borderRadius: 9 }} >
                <div style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center', marginTop: 5, top: '0' }}>Liste des dirigeants</div>
                <Table sx={{ minWidth: 220 }} aria-label="List Of Leaders">
                    <TableBody>
                        {leaders?.length > 0 && leaders?.map((row) => (
                            <TableRow
                                key={row.getId()}
                                onClick={() => {
                                    navigate(`/leaders/${row.getId()}`);
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
                                    {row.getNom()} {row.getPrenom()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
