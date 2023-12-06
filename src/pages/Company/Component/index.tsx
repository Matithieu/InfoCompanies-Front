import React, { useState } from 'react';
import { CssBaseline, Typography, Grid, Paper, Box, Button } from '@mui/material';
import Chart from '../../../components/Chart/index.tsx';
import ListOfLeaders from '../../../components/ListOfLeaders/index.tsx';
import Details from '../../../components/Details/index.tsx';
import { useCompanyContext } from '../../../context/CompanyContext.tsx';
import Company, { CheckedStatus } from '../../../data/company.ts';
import { StatutIcon, manageIsChecked } from '../../../components/StatutIcon/index.tsx';

export default function CompanyPage() {
  //TODO: remove, this demo shouldn't need to have a useEffect. A call to the API should be made.

  const { selectedCompany, setSelectedCompany } = useCompanyContext();
  const [statut, setStatut] = useState(selectedCompany?.getChecked());


  React.useEffect(() => {
    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

    console.log('checkedDone', checkedDone);
    console.log('checkedToDo', checkedToDo);

    if (selectedCompany) {
      if (checkedDone.includes(selectedCompany.getSiren())) {
        selectedCompany.setChecked(CheckedStatus.Done);
      } else if (checkedToDo.includes(selectedCompany.getSiren())) {
        selectedCompany.setChecked(CheckedStatus.ToDo);
      } else {
        selectedCompany.setChecked(CheckedStatus.NotDone);
      }
      setSelectedCompany(selectedCompany);
    }
    setStatut(selectedCompany?.getChecked());
  }, [selectedCompany]);

  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckedStatus;

    if (company.getChecked() === CheckedStatus.NotDone) {
      newStatus = CheckedStatus.ToDo;
    } else if (company.getChecked() === CheckedStatus.ToDo) {
      newStatus = CheckedStatus.Done;
    } else {
      newStatus = CheckedStatus.NotDone;
    }

    company.setChecked(newStatus);
    manageIsChecked(company.getSiren(), newStatus);
    setSelectedCompany(company);
    setStatut(selectedCompany?.getChecked());
    return newStatus;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div key={selectedCompany?.getSiren()} style={{}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'center',
            }}
          >
            <Typography
              fontFamily="Poppins"
              variant="h4"
              align="left"
              marginTop={10}
              marginLeft={0}
              marginBottom={5}
            >
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                onClick={() => {
                  selectedCompany?.setChecked(handleChangeStatut(selectedCompany));
                }}
              >
                <StatutIcon statut={statut} />
              </button>
              {selectedCompany?.getDenomination()}
            </Typography>
          </div>

          <Grid>
            <Grid container spacing={3} justifyContent="center" marginTop={5}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                  }}
                >
                  <Details />

                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                  }}
                >
                  <ListOfLeaders />
                </Paper>
              </Grid>

            </Grid>
            <Grid container spacing={3} justifyContent="center" marginTop={5}>
              <Grid item xs={8} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 220,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={8} md={4}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 220,
                  }}
                >
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box >

  );
}
