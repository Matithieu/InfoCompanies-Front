import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "../../components/Chart/index.tsx";
import Details from "../../components/Details/index.tsx";
import ListOfLeaders from "../../components/ListOfLeaders/index.tsx";
import {
  StatutIcon,
  manageIsChecked,
} from "../../components/StatutIcon/index.tsx";
import Company, { CheckedStatus } from "../../data/company.ts";
import { ErrorJwtAuth } from "../../data/errorAuthJwt.ts";
import useAuthStore from "../../store/authStore.tsx";
import { useCompanyStore } from "../../store/companyStore.tsx";
import { companyJsonToCompany } from "../../utils/companyJsonToCompany.tsx";

async function fetchCompanies(id: string) {
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

    const checkedDone = JSON.parse(localStorage.getItem("checkedDone") || "[]");
    const checkedToDo = JSON.parse(localStorage.getItem("checkedToDo") || "[]");

    if (
      company !== null &&
      company instanceof Company &&
      typeof company.getAdresse === "function"
    ) {
      if (checkedDone.includes(company.getId())) {
        company.setChecked(CheckedStatus.Done);
      } else if (checkedToDo.includes(company.getId())) {
        company.setChecked(CheckedStatus.ToDo);
      } else {
        company.setChecked(CheckedStatus.NotDone);
      }
      return company;
    }

    return company;
  } else {
    const error: ErrorJwtAuth = await response.json();
    if (response.status === 401) {
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

export default function CompanyPage() {
  const [company, setCompany] = useState<Company>();
  const [statut, setStatut] = useState<CheckedStatus>(CheckedStatus.NotDone);

  const id = window.location.pathname.split("/")[2];
  const { setSelectedCompany } = useCompanyStore();
  const { setAuthUser, setRequestLoading } = useAuthStore();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["company", id],
    queryFn: () => fetchCompanies(id),
    retry: 1,
  });

  useEffect(() => {
    if (data != null && !isError) {
      setSelectedCompany(data);
      setCompany(data);
      setStatut(data.getChecked());
    }
  }, [data, isError, setSelectedCompany]);

  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckedStatus;

    if (company.getChecked() === CheckedStatus.NotDone) {
      newStatus = CheckedStatus.ToDo;
    } else if (company.getChecked() === CheckedStatus.ToDo) {
      newStatus = CheckedStatus.Done;
    } else {
      newStatus = CheckedStatus.NotDone;
    }

    console.log("checked", newStatus);

    company.setChecked(newStatus);
    manageIsChecked(company.getId(), newStatus);
    setCompany(company);
    setStatut(newStatus);
    return newStatus;
  };

  if (error != null && isError) {
    return (
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <h1>{error.message}</h1>
        <Button
          variant="soft"
          color="primary"
          onClick={() => {
            setRequestLoading(true);
            setAuthUser(null);
            setRequestLoading(false);
          }}
        >
          Se reconnecter
        </Button>
      </div>
    );
  }
  if (isPending) {
    return <div>Chargement des données...</div>;
  } else if (company != null && typeof company.getAdresse === "function") {
    return (
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div key={company?.getId()} style={{}}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Typography
                level="h1"
                sx={{
                  marginTop: 5,
                  marginLeft: 0,
                  marginBottom: 5,
                  alignSelf: "flex-start",
                }}
              >
                <IconButton
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
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
                <Grid xs={12} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 220,
                      maxWidth: 400,
                    }}
                  >
                    <Details />
                  </Card>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 220,
                    }}
                  >
                    <ListOfLeaders />
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={3} justifyContent="center" marginTop={5}>
                <Grid xs={8} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 220,
                      minWidth: 400,
                    }}
                  >
                    <Chart />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    );
  }
}
