import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EmployeeService from '../service/EmployeeService';
import Sidebar from '../common/Sidebar';

function EmployeManagementPage() {
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeService.getAllEmployes(token);

      if (response && response.employeDataList) {
        setEmployes(response.employeDataList);
      } else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmploye = async (employeId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      if (confirmDelete) {
        const token = localStorage.getItem('token');
        await EmployeeService.deleteEmploye(employeId, token);
        fetchEmployes();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", minHeight: "850px" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employees Management Page
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/admin/add-employee" sx={{ mb: 2 }}>
          Add Employee
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employes.map(employe => (
                <TableRow key={employe.employeId}>
                  <TableCell>{employe.employeId}</TableCell>
                  <TableCell>{employe.nom}</TableCell>
                  <TableCell>{employe.prenom}</TableCell>
                  <TableCell>{employe.departement}</TableCell>
                  <TableCell>{employe.salaire}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => deleteEmploye(employe.employeId)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                    <Button 
                      variant="contained" 
                      component={Link} 
                      to={`/update-employe/${employe.employeId}`}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button 
                      variant="contained" 
                      component={Link} 
                      to={`/hours-worked/${employe.employeId}`}
                    >
                      Work Hours
                    </Button>
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

export default EmployeManagementPage;
