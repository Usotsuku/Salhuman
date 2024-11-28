import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token);
      const { name, email, role } = response.user;
      setUserData({ name, email, role });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        await UserService.updateUser(userId, userData, token);
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert('An error occurred while updating user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update User
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
                value={userData.name}
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
                value={userData.email}
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
                value={userData.role}
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
            Update
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateUser;
