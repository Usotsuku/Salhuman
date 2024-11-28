import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import FichePaieService from '../service/FichePaieService'
import Sidebar from '../common/Sidebar';
import { Link } from 'react-router-dom';

function EmployePayrollManagementPage({ employeId }) {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const token = localStorage.getItem('token');
            const employeId = localStorage.getItem('Id');
            const response = await FichePaieService.getAllFichePaieByEmploye(employeId,token);

            if (response && response.fichePaieDataList) {
                setPayrolls(response.fichePaieDataList);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching payrolls:', error);
        }
    };

    return (
        <Box sx={{ display: "flex", backgroundColor: "white", minHeight: "850px" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Payroll Management Page
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Period</TableCell>
                                <TableCell>Gross Amount</TableCell>
                                <TableCell>Net Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payrolls.map(payroll => (
                                <TableRow key={payroll.ficheId}>
                                    <TableCell>{payroll.ficheId}</TableCell>
                                    <TableCell>{payroll.periode}</TableCell>
                                    <TableCell>{payroll.montant_brut}</TableCell>
                                    <TableCell>{payroll.montant_net}</TableCell>
                                    <TableCell>
                                        <Link to={`/payroll/${payroll.ficheId}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" color="primary">
                                                View Details
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default EmployePayrollManagementPage;
