import React, { useState } from 'react';
import HeureTravailleeService from '../service/HeureTravailleeService';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import Sidebar from '../common/Sidebar';

export default function AddHeureTravaillee() {
  const [date] = useState(new Date().toISOString().slice(0, 10)); // Set default date to current day
  const [type, setType] = useState('');
  const [nb_heures, setNb_heures] = useState(8); // Set default number of hours to 8

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const heureTravaillee = {
      date,
      type,
      nb_heures,
      statut: 'Pending' // Set default status to Pending
    };

    try {
      await HeureTravailleeService.addHeureTravaillee(heureTravaillee, token);
      alert('Hours worked added successfully');
    } catch (error) {
      console.error('Error adding hours worked:', error);
    }
  };

  return (
    <div>
      <Sidebar />
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Hours Worked
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                value={date}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="type"
                label="Type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nb_heures"
                label="Number of Hours"
                name="nb_heures"
                type="number"
                value={nb_heures}
                onChange={(e) => setNb_heures(e.target.value)}
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
            Add Hours Worked
          </Button>
        </Box>
      </Paper>
    </Container>
    </div>
  );
}
