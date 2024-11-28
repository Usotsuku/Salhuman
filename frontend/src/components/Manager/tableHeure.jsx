import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from '../common/Sidebar';
import HeureTravailleeService from '../service/HeureTravailleeService';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function HoursWorkedPage() {
  const [hoursWorked, setHoursWorked] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const { employeId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HeureTravailleeService.getCurrentMonthHoursWorkedByEmployee(employeId, token);
        setHoursWorked(response.data);
        setEmployeeName(response.data.length > 0 ? `${response.data[0].nom} ${response.data[0].prenom}` : '');
      } catch (error) {
        console.error('Error fetching hours worked data:', error);
      }
    };

    fetchData();
  }, [employeId, token]);

  const totals = hoursWorked.reduce((acc, day) => {
    acc.regularHours += day.regularHours;
    acc.overtimeHours += day.overtimeHours;
    acc.totalHours += day.totalHours;
    return acc;
  }, { regularHours: 0, overtimeHours: 0, totalHours: 0 });

  const generatePDF = () => {
    if (hoursWorked.length === 0) {
      return; // No data to generate PDF
    }

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Set font and text size
    doc.setFont('helvetica', 'normal');

    // Add content to the PDF
    doc.text('Rapport des Heures Travaillées', 20, 20);
    doc.setFontSize(12);

    // Employee information
    doc.text(`Nom de l'employé : ${employeeName}`, 20, 30);
    doc.text(`Période de paie débutant le : 1 ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`, 20, 40);

    // Table with hours worked details
    let startY = 60;
    doc.autoTable({
      startY,
      head: [['DATE (JJ/MM/AAAA)', 'Début de la plage horaire', 'Fin de la plage horaire', 'Temps régulier', 'Temps supplémentaire', 'Heures Totales']],
      body: hoursWorked.map(day => [
        new Date(day.date).toLocaleDateString(),
        day.startTime,
        day.endTime,
        day.regularHours,
        day.overtimeHours,
        day.totalHours
      ]),
      headStyles: {
        fillColor: '#f0f0f0',
        textColor: '#000',
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        textColor: '#000',
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 }
      }
    });

    // Save the PDF
    doc.save('rapport_heures_travaillees.pdf');
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", marginTop: "30px" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Période de paie débutant le : 1 {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Nom de l'employé : {employeeName}
          </Typography>
        </Paper>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>DATE (JJ/MM/AAAA)</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Début de la plage horaire</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Fin de la plage horaire</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Temps régulier</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Temps supplémentaire</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Heures Totales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hoursWorked.map((day, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: 1 }}>{new Date(day.date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ border: 1 }}>{day.startTime}</TableCell>
                  <TableCell sx={{ border: 1 }}>{day.endTime}</TableCell>
                  <TableCell sx={{ border: 1 }}>{day.regularHours}</TableCell>
                  <TableCell sx={{ border: 1 }}>{day.overtimeHours}</TableCell>
                  <TableCell sx={{ border: 1 }}>{day.totalHours}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{totals.regularHours}</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{totals.overtimeHours}</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{totals.totalHours}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={generatePDF}>
            Télécharger PDF
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HoursWorkedPage;
