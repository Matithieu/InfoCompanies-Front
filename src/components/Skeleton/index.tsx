import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import { Column } from '../TableCompany';
import { Box } from '@mui/material';

interface TableSkeletonProps {
    columns: Column[];
}

export const TableSkeleton = ({ columns }: TableSkeletonProps) => {
    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

            <TableContainer sx={{ width: '100%', minHeight: 380, height: '100%', borderRadius: 3 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth, fontFamily: 'Poppins', fontSize: 16, }}>
                                    <Skeleton animation="wave" variant="text" />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index} style={{ alignItems: 'center' }}>
                                <TableCell key={index + "status"} align="center" >
                                    <Skeleton animation="wave" variant="circular" width={25} height={25} />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        <Skeleton animation="wave" variant="text" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
