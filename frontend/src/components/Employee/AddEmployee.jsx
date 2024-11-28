import React, { useState } from 'react';
import EmployeeService from '../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper
} from '@mui/material';

function CreateEmployeePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    departement: '',
    salaire: '',
    poste: '',
    date_embauche: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register method from EmployeeService
      const token = localStorage.getItem('token');
      await EmployeeService.addEmploye(formData, token);

      // Clear the form fields after successful registration
      setFormData({
        nom: '',
        prenom: '',
        departement: '',
        salaire: '',
        poste: '',
        date_embauche: '',
      });
      alert('Employee created successfully');
      navigate('/admin/user-management');
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('An error occurred while creating employee');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Employee
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nom"
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="prenom"
                label="Prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="departement"
                label="Departement"
                name="departement"
                value={formData.departement}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="poste"
                label="Poste"
                name="poste"
                value={formData.poste}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="salaire"
                label="Salaire"
                name="salaire"
                type="number"
                value={formData.salaire}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date_embauche"
                label="Date d'embauche"
                name="date_embauche"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.date_embauche}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Employee
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateEmployeePage;
