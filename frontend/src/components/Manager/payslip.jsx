import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Divider, Button } from '@mui/material';
import Sidebar from '../common/Sidebar';
import PayrollService from '../service/FichePaieService';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function PayslipPage() {
  const { ficheId } = useParams();
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    fetchPayslip();
  }, [ficheId]);

  const fetchPayslip = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await PayrollService.getPayrollById(ficheId, token);
      console.log('Payslip data received:', response);
      setPayslip(response);
    } catch (error) {
      console.error('Error fetching payslip:', error);
    }
  };

  const generatePDF = () => {
    if (!payslip) return;

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Set font and text size
    doc.setFont('helvetica', 'normal');

    // Add content to the PDF
    doc.text('Bulletin De Paie', 20, 20);
    doc.setFontSize(12);

    // Employee information
    doc.text(`${payslip.fiche_paie.nom} ${payslip.fiche_paie.prenom}`, 20, 30);
    doc.text(`Period: ${payslip.fiche_paie.periode}`, 20, 40);
    doc.text(`Date d'embauche: ${payslip.fiche_paie.date_embauche}`, 20, 50);

    // Table with payslip details
    let startY = 70;
    doc.autoTable({
      startY,
      head: [['Rubrique', 'Base', 'Taux', 'Montant']],
      body: [
        ['Salaire de base', payslip.fiche_paie.montant_brut, '', payslip.fiche_paie.montant_brut],
        ['Salaire brut', payslip.fiche_paie.montant_brut, '', payslip.fiche_paie.montant_brut],
        ['AMO', payslip.fiche_paie.montant_brut, '1.85%', payslip.fiche_paie.amo],
        ['CNSS', payslip.fiche_paie.montant_brut, '4.52%', payslip.fiche_paie.cnss],
        ['Impot sur revenu', payslip.fiche_paie.montant_brut, '30%', payslip.fiche_paie.impotSurRevenu],
        ['Salaire NET', '', '', payslip.fiche_paie.montant_net],
        ['Element Salaire', '', '', ''],
        ...payslip.fiche_paie.elements_Salaires.map(element => [element.type, '', '', element.montant]),
        ['Total Elements Salaire', '', '', totalPrimes],
        ['Total Salaire', '', '', totalSalary]
      ],
      headStyles: {
        fillColor: '#f0f0f0',
        textColor: '#000',
        fontStyle: 'normal',
        fontSize: 10
      },
      bodyStyles: {
        textColor: '#000',
        fontSize: 10
      },
      columnStyles: {
        0: { fontStyle: 'bold' }
      }
    });

    // Save the PDF
    doc.save('bulletin_de_paie.pdf');
  };

  if (!payslip) {
    return <Typography>Loading...</Typography>;
  }

  // Calculate total primes
  const totalPrimes = payslip.fiche_paie.elements_Salaires
    ? payslip.fiche_paie.elements_Salaires.reduce((sum, elem) => sum + elem.montant, 0)
    : 0;

  // Calculate total salary (salaire net + total primes)
  const totalSalary = payslip.fiche_paie.montant_net + totalPrimes;

  // Calculate AMO, CNSS, and Impot sur revenu taux dynamically
  let amoTaux = '1.85%'; // Default value
  let cnssTaux = '4.52%'; // Default value
  let impotTaux = '30%'; // Default value

  // Adjust taux based on salary_brut thresholds
  const { salary_brut } = payslip.fiche_paie;
  if (salary_brut > 18000) {
    impotTaux = '38%';
  } else if (salary_brut > 8000) {
    impotTaux = '30%';
  } else if (salary_brut > 6000) {
    impotTaux = '20%';
  } else if (salary_brut > 3000) {
    impotTaux = '10%';
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", marginTop: "70px" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Bulletin De Paie
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {payslip.fiche_paie.nom} {payslip.fiche_paie.prenom}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                Period: {payslip.fiche_paie.periode}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                Date d'embauche: {payslip.fiche_paie.date_embauche}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Rubrique</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Base</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Taux</TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Montant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: 1 }}>Salaire de base</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1 }}>Salaire brut</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>AMO</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
                <TableCell sx={{ border: 1 }}>{amoTaux}</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.amo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>CNSS</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
                <TableCell sx={{ border: 1 }}>{cnssTaux}</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.cnss}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Impot sur revenu</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.montant_brut}</TableCell>
                <TableCell sx={{ border: 1 }}>{impotTaux}</TableCell>
                <TableCell sx={{ border: 1 }}>{payslip.fiche_paie.impotSurRevenu}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Salaire NET</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{payslip.fiche_paie.montant_net}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Element Salaire</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
              </TableRow>
              {payslip.fiche_paie.elements_Salaires && payslip.fiche_paie.elements_Salaires.map(element => (
                <TableRow key={element.elementSalaireId}>
                  <TableCell sx={{ border: 1 }}>{element.type}</TableCell>
                  <TableCell sx={{ border: 1 }}></TableCell>
                  <TableCell sx={{ border: 1 }}></TableCell>
                  <TableCell sx={{ border: 1 }}>{element.montant}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Total Elements Salaire</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{totalPrimes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>Total Salaire</TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1 }}></TableCell>
                <TableCell sx={{ border: 1, fontWeight: 'bold' }}>{totalSalary}</TableCell>
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

export default PayslipPage;
