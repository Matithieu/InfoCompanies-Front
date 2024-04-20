import { Box, Card, Grid, IconButton, Typography } from "@mui/joy"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import Chart from "../../../components/parts/Chart/index.tsx"
import DetailsCompany from "../../../components/parts/DetailsCompany/index.tsx"
import ListOfLeaders from "../../../components/parts/ListOfLeaders/index.tsx"
import {
  StatutIcon,
  manageIsChecked,
} from "../../../components/common/StatutIcon/index.tsx"
import { Company, CheckStatus } from "../../../data/types/company.ts"
import { useCompanyStore } from "../../../store/companyStore.tsx"
import { fetchCompnayById } from "../../../utils/api/index.ts"
import LogoutButton from "../../../components/common/buttons/logout.tsx"

async function fetchCompanies(id: string) {
  const response = await fetchCompnayById(id)

  if (response) {
    const company: Company = response

    const checkedDone = JSON.parse(localStorage.getItem("checkedDone") || "[]")
    const checkedToDo = JSON.parse(localStorage.getItem("checkedToDo") || "[]")

    if (company !== null) {
      if (checkedDone.includes(company.id)) {
        company.checked = CheckStatus.DONE
      } else if (checkedToDo.includes(company.id)) {
        company.checked = CheckStatus.TO_DO
      } else {
        company.checked = CheckStatus.NOT_DONE
      }
      return company
    }

    return company
  }
}

export default function CompanyPage() {
  const [company, setCompany] = useState<Company>()
  const [statut, setStatut] = useState<CheckStatus>(CheckStatus.NOT_DONE)

  const id = window.location.pathname.split("/")[2]
  const { setSelectedCompany } = useCompanyStore()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["company" + id],
    queryFn: () => fetchCompanies(id),
    retry: 1,
  })

  useEffect(() => {
    if (data != null) {
      setSelectedCompany(data)
      setCompany(data)
      setStatut(data.checked)
    }
  }, [data, setSelectedCompany])

  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckStatus

    if (company.checked === CheckStatus.NOT_DONE) {
      newStatus = CheckStatus.TO_DO
    } else if (company.checked === CheckStatus.TO_DO) {
      newStatus = CheckStatus.DONE
    } else {
      newStatus = CheckStatus.NOT_DONE
    }

    console.log("checked", newStatus)

    company.checked = newStatus
    manageIsChecked(company.id, newStatus)
    setCompany(company)
    setStatut(newStatus)
    return newStatus
  }

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
        <LogoutButton />
      </div>
    )
  }
  if (isPending) {
    return <div>Chargement des données...</div>
  } else if (company != null) {
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
          <div key={company.id} style={{}}>
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
                    company.checked = handleChangeStatut(company)
                  }}
                >
                  <StatutIcon statut={statut} />
                </IconButton>
                {company.companyName}
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
                    <DetailsCompany />
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
    )
  }
}
