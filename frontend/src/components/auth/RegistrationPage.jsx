import React, { useState } from 'react';
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
import UserService from '../service/UserService';

function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register method from UserService
      const token = localStorage.getItem('token');
      await UserService.register(formData, token);

      // Clear the form fields after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
      });
      alert('User registered successfully');
      navigate('/admin/user-management');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Enter your role"
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
            Add
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistrationPage;
