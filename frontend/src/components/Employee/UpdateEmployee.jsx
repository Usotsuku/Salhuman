import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Grid, Paper } from '@mui/material';
import EmployeeService from '../service/EmployeeService';

function UpdateEmploye() {
  const navigate = useNavigate();
  const { employeId } = useParams();

  const [employeData, setEmployeData] = useState({
    nom: '',
    prenom: '',
    departement: '',
    salaire: '',
    poste: '',
    date_embauche: '',
  });

  useEffect(() => {
    fetchEmployeDataById(employeId); // Fetch employee data when employeId changes
  }, [employeId]);

  const fetchEmployeDataById = async (employeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeService.getEmployeDetails(employeId, token);
      const { nom, prenom, departement, salaire, poste, date_embauche } = response.employe;
      setEmployeData({ nom, prenom, departement, salaire, poste, date_embauche });
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeData((prevEmployeData) => ({
      ...prevEmployeData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this employee?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        await EmployeeService.updateEmploye(employeId, employeData, token);
        navigate('/admin/employe-management');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('An error occurred while updating employee');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Employee
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
                value={employeData.nom}
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
                value={employeData.prenom}
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
                value={employeData.departement}
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
                value={employeData.poste}
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
                value={employeData.salaire}
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
                value={employeData.date_embauche}
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
            Update Employee
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateEmploye;
