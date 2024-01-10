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
import { useCompanyStore } from '../../store/companyStore';

/**
 * 
 * @param companyDetails Takes a company as a parameter and displays its leaders in a table when selected
 * @returns A table of leaders
 */
export default function ListOfLeaders() {
    const navigate = useNavigate();

    const { selectedCompany } = useCompanyStore();

    const temp : Leader[] = [];

    const [leaders, setLeaders] = useState<Leader[]>(null as unknown as Leader[]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        if (selectedCompany !== null && selectedCompany instanceof Company && typeof selectedCompany.getAdresse === 'function') {
            setLeaders(temp);
        } else {
            setLeaders(null as unknown as Leader[]);
        }
        setIsLoading(false);
    }, [selectedCompany]);

    if (leaders === null) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
    }
    if (leaders.length === 0) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Pas de données pour cette entreprise</a>;
    }
    else {
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
