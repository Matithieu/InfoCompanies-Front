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
import { useCompanyStore } from '../../store/companyStore';
import Company from '../../data/company';   

export default function Details() {
    const { selectedCompany } = useCompanyStore();

    if (selectedCompany === null) {
        return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
    }
    else if (selectedCompany !== null && selectedCompany instanceof Company && typeof selectedCompany.getAdresse === 'function') {
        return (
            <TableContainer style={{ borderRadius: 9 }}>
                <a style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center' }}>Détails</a>
                <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip arrow title="Numéro de téléphone" placement="top">
                                    <PhoneIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{selectedCompany.getPhone() ?? "No phone found"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip arrow title="Adresse email" placement="top">
                                    <EmailIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{selectedCompany.getEmail() ?? "No email found"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip arrow title="Site web" placement="top">
                                    <WebAssetIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{selectedCompany.getWebsite() ?? "No website found"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip arrow title="Adresse" placement="top">
                                    <BusinessIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{selectedCompany.getAdresse() ?? "No address found"}</a>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontFamily: 'Poppins' }}>
                                <Tooltip arrow title="Date de création" placement="top">
                                    <CalendarTodayOutlinedIcon />
                                </Tooltip>
                                <span style={{ marginLeft: '10px' }}></span>
                                <a style={{ fontSize: '18px', fontFamily: 'Poppins' }}>{selectedCompany.getDateImmatriculation() ?? "No date found"}</a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
