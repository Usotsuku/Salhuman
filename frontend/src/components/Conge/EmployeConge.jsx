import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import CongeService from '../service/CongeService';
import Sidebar from '../common/Sidebar';

function CongeListPage() {
    const [conges, setConges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchConges();
    }, []);

    const fetchConges = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await CongeService.getAllEmployeeConges(token);

            if (response && response.congeDataList) {
                setConges(response.congeDataList);
            } else {
                console.error('Invalid response structure:', response);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Conges:', error);
            setError('Failed to fetch conges');
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", backgroundColor: "white", minHeight: "900px" }}>
          <Sidebar />
            <Box sx={{ width: '100%', p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Conges
                </Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    <Link to="/demanderConge" style={{ textDecoration: 'none', color: 'white' }}>Demander Conge</Link>
                </Button>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="body1" style={{ color: 'red', marginBottom: '1rem' }}>{error}</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Date Debut</TableCell>
                                    <TableCell>Date Fin</TableCell>
                                    <TableCell>Statuts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {conges.map(conge => (
                                    <TableRow key={conge.congeId}>
                                        <TableCell>{conge.congeId}</TableCell>
                                        <TableCell>{conge.type}</TableCell>
                                        <TableCell>{conge.dateDebut}</TableCell>
                                        <TableCell>{conge.dateFin}</TableCell>
                                        <TableCell>{conge.statuts}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
}

export default CongeListPage;
