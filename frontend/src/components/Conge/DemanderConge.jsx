import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CongeService from '../service/CongeService';
import Sidebar from '../common/Sidebar';

function DemanderCongePage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: '',
        dateDebut: '',
        dateFin: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await CongeService.demanderConge(formData, token);

            // Clear the form fields after successful submission
            setFormData({
                type: '',
                dateDebut: '',
                dateFin: '',
            });
            alert('Conge created successfully');
            navigate('/demanderConge');

        } catch (error) {
            console.error('Error creating Conge:', error);
            alert('An error occurred while creating conge');
        }
    };

    return (
        <div>
            <Sidebar />
        <Container maxWidth="sm" sx={{ mt: 4 , backgroundColor: "white", minHeight: "500px" }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">Demander Conge</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date Debut"
                            type="date"
                            name="dateDebut"
                            value={formData.dateDebut}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date Fin"
                            type="date"
                            name="dateFin"
                            value={formData.dateFin}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Demander
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </div>
    );
}

export default DemanderCongePage;
