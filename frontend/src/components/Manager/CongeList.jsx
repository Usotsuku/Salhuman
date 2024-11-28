import React, { useState, useEffect } from 'react';
import CongeService from '../service/CongeService';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Sidebar from '../common/Sidebar';

function ManagerCongesPage() {
    const [conges, setConges] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchConges = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await CongeService.getAllConges(token);
                setConges(response.congeDataList || []);
                console.log(response)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch conges');
                setLoading(false);
            }
        };
        fetchConges();
    }, []);

    const handleApprove = async (congeId) => {
        try {
            const token = localStorage.getItem('token');
            await CongeService.approuverConge(congeId, token);
            setConges((prevConges) =>
                prevConges.map((conge) =>
                    conge.congeId === congeId ? { ...conge, statuts: 'Approved' } : conge
                )
            );
            showSnackbar('Conge approved successfully.');
        } catch (err) {
            setError('Failed to approve conge');
        }
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            
            <Sidebar />
            <Typography variant="h4" gutterBottom>All Conges</Typography>
            {error && <Typography variant="body1" style={{ color: 'red', marginBottom: '1rem' }}>{error}</Typography>}
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Employee</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Date Debut</TableCell>
                                <TableCell>Date Fin</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {conges.map((conge) => (
                                <TableRow key={conge.congeId}>
                                    <TableCell>{conge.congeId}</TableCell>
                                    <TableCell>{conge.nom} {conge.prenom}</TableCell>
                                    <TableCell>{conge.type}</TableCell>
                                    <TableCell>{new Date(conge.dateDebut).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(conge.dateFin).toLocaleDateString()}</TableCell>
                                    <TableCell>{conge.statuts}</TableCell>
                                    <TableCell>
                                        {conge.statuts !== 'Approved' && (
                                            <Button variant="contained" color="primary" onClick={() => handleApprove(conge.congeId)}>Approve</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" severity="success" onClose={handleCloseSnackbar}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default ManagerCongesPage;
