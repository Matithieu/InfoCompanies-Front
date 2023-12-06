import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Tooltip } from '@mui/material';
import Company from '../../data/company';
import { useCompanyContext } from '../../context/CompanyContext';
import { useState } from 'react';

export default function Details() {
    const { selectedCompany } = useCompanyContext();
    const [company, setCompany] = useState<Company>(null as unknown as Company);

    React.useEffect(() => {
        // Use getChiffreAffaire() to test if the company is valid
        if (selectedCompany !== null && selectedCompany instanceof Company && typeof selectedCompany.getChiffreAffaire=== 'function') {
            setCompany(selectedCompany);
        } else {
            setCompany(null as unknown as Company);
        }
    }, [selectedCompany]);

    if (company === null) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
    }
    if(company.getSiren().length === 0) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Pas de données pour cette entreprise</a>;
    } 
    else {
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
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{company?.getPhone() ?? "No company found"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{company?.getEmail()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Site web" placement="top">
                                    <WebAssetIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{company?.getWebsite()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Adresse" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{company?.getAddress()}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip title="Date de création" placement="top">
                                    <CalendarTodayOutlinedIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{company?.getCreationDate()}</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
