import React, { useState } from 'react';
import { CssBaseline, Typography, Grid, Paper, Box, IconButton } from '@mui/material';
import Chart from '../../components/Chart/index.tsx';
import ListOfLeaders from '../../components/ListOfLeaders/index.tsx';
import Details from '../../components/Details/index.tsx';
import Company, { CheckedStatus } from '../../data/company.ts';
import { StatutIcon, manageIsChecked } from '../../components/StatutIcon/index.tsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { companyJsonToCompany } from '../../utils/companyJsonToCompany.tsx';
import { useCompanyStore } from '../../store/companyStore.tsx';

export default function CompanyPage() {

  const { setSelectedCompany } = useCompanyStore();
  const [company, setCompany] = useState<Company>();
  const [statut, setStatut] = useState<CheckedStatus>(CheckedStatus.NotDone);
  const id = window.location.pathname.split('/')[2];

  async function fetchCompanies() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/company/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const company = companyJsonToCompany(data);
        if (company != null) {
          setCompany(company);
          setSelectedCompany(company);
        }
        console.log('TEST', company);
        return data;
      }
      else {
        console.log("error: ", data);
        toast.error("Erreur lors de la récupération des entreprises", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des entreprises", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      setCompany(null as unknown as Company);
      await fetchCompanies();
    }
    fetchData();
  }, [id]);

  React.useEffect(() => {
    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

    if (company !== null && company instanceof Company && typeof company.getAdresse === 'function') {
      if (checkedDone.includes(company.getId())) {
        company.setChecked(CheckedStatus.Done);
      } else if (checkedToDo.includes(company.getId())) {
        company.setChecked(CheckedStatus.ToDo);
      } else {
        company.setChecked(CheckedStatus.NotDone);
      }
      setCompany(company);
    }
    setStatut(company?.getChecked() ?? CheckedStatus.NotDone);
  }, [company]);

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
    manageIsChecked(company.getId(), newStatus);
    setCompany(company);
    setStatut(newStatus);
    return newStatus;
  };

  if (company == null) {
    return <div>Chargement des données...</div>;
  }
  else if (company != null && typeof company.getAdresse === 'function') {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <div key={company?.getId()} style={{}}>
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
                <IconButton style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                  onClick={() => {
                    company?.setChecked(handleChangeStatut(company));
                  }}
                >
                  <StatutIcon statut={statut} />
                </IconButton>
                {company?.getDenomination()}
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
}