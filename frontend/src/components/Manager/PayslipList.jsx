import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import PayrollService from '../service/FichePaieService';
import Sidebar from '../common/Sidebar';
import { Link } from 'react-router-dom';

function PayrollManagementPage() {
    const [payrolls, setPayrolls] = useState([]);
    const [filteredPayrolls, setFilteredPayrolls] = useState([]);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await PayrollService.getAllFichePaie(token);

            if (response && response.fichePaieDataList) {
                setPayrolls(response.fichePaieDataList);
                setFilteredPayrolls(response.fichePaieDataList);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching payrolls:', error);
        }
    };

    const fetchPayrollsByPeriod = async () => {
        if (month && year) {
            const selectedPeriod = `${month} ${year}`;
            try {
                const token = localStorage.getItem('token');
                const response = await PayrollService.getPayrollByPeriod(selectedPeriod, token);

                if (Array.isArray(response.fichePaieDataList)) {
                    setFilteredPayrolls(response.fichePaieDataList);
                } else {
                    console.error('Invalid response structure:', response);
                    setFilteredPayrolls([]);
                }
            } catch (error) {
                console.error('Error fetching payrolls by period:', error);
                setFilteredPayrolls([]);
            }
        } else {
            setFilteredPayrolls(payrolls);
        }
    };

    const handleSearch = () => {
        fetchPayrollsByPeriod();
    };

    return (
        <Box sx={{ display: 'flex',background:"white" ,minHeight: '100vh' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Payroll Management Page
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Search by Month and Year:</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <select
                            onChange={(e) => setMonth(e.target.value)}
                            style={{ padding: '8px', fontSize: '16px', borderRadius: '5px' }}
                        >
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Enter Year"
                            onChange={(e) => setYear(e.target.value)}
                            style={{ padding: '8px', fontSize: '16px', borderRadius: '5px' }}
                        />
                        <Button variant="contained" onClick={handleSearch} sx={{ height: '100%' }}>
                            Search
                        </Button>
                    </div>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fiche ID</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Period</TableCell>
                                <TableCell align="right">Brut Amount</TableCell>
                                <TableCell align="right">Net Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPayrolls.map((payroll) => (
                                <TableRow key={payroll.ficheId}>
                                    <TableCell>{payroll.ficheId}</TableCell>
                                    <TableCell>{`${payroll.nom} ${payroll.prenom}`}</TableCell>
                                    <TableCell>{payroll.periode}</TableCell>
                                    <TableCell align="right">{payroll.montant_brut}</TableCell>
                                    <TableCell align="right">{payroll.montant_net}</TableCell>
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

export default PayrollManagementPage;
