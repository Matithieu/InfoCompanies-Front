import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

function Invoices() {

  //TODO: Make this page with Stripe Invoices

  // Créez un tableau de données pour stocker les informations sur les factures
  const invoicesData = [
    { id: 1, name: 'Invoice 1', amount: 100 },
    { id: 2, name: 'Invoice 2', amount: 75 },
    // Ajoutez d'autres factures au besoin
  ];

  // Fonction pour gérer le téléchargement de la facture
  const handleDownload = (invoiceId) => {
    // Mettez en œuvre la logique de téléchargement ici en fonction de l'ID de la facture
    alert(`Télécharger la facture ${invoiceId}`);
  };

  // Fonction pour gérer la visualisation de la facture
  const handleView = (invoiceId) => {
    // Mettez en œuvre la logique de visualisation ici en fonction de l'ID de la facture
    alert(`Visualiser la facture ${invoiceId}`);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      <Typography variant="body1" gutterBottom>
        View and manage your invoices here.
      </Typography>
      {/* Créez un tableau HTML pour afficher les factures */}
      <table>
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoicesData.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.name}</td>
              <td>${invoice.amount}</td>
              <td>
                <Button variant="contained" style={{marginRight: "10px"}} onClick={() => handleDownload(invoice.id)}>Télécharger</Button>
                
                <Button variant="contained" onClick={() => handleView(invoice.id)}>Visualiser</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

export default Invoices;
