import 'react-toastify/dist/ReactToastify.css'

import { Box, Card, Grid, IconButton, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { ErrorButton } from '../../../components/common/buttons/AuthButtons.tsx'
import ScrapCompanyButton from '../../../components/common/buttons/scrapCompanyButton.tsx'
import {
  manageIsChecked,
  StatutIcon,
} from '../../../components/common/StatutIcon/index.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/ListOfLeaders/index.tsx'
import { CheckStatus, Company } from '../../../data/types/company.ts'
import { useCompanyStore } from '../../../store/companyStore.tsx'
import { fetchCompnayById } from '../../../utils/api/index.ts'

async function fetchCompanies(companyId: string) {
  const response = await fetchCompnayById(companyId)

  if (response) {
    const company: Company = response

    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]')
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]')

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

  const { companyId } = useParams()
  const { setSelectedCompany } = useCompanyStore()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company' + companyId],
    queryFn: () => fetchCompanies(companyId ?? ''),
    retry: 1,
  })

  useEffect(() => {
    if (data !== null && data) {
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

    company.checked = newStatus
    manageIsChecked(company.id, newStatus)
    setCompany(company)
    setStatut(newStatus)
    return newStatus
  }

  if (error !== null && isError) {
    return <ErrorButton error={error} />
  }

  if (isPending) {
    return <div>Chargement des données...</div>
  } else if (company !== null && company) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <div key={company.id} style={{}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <Typography
                level="h1"
                sx={{
                  marginLeft: 0,
                  marginBottom: 5,
                  alignSelf: 'flex-start',
                }}
              >
                <IconButton
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ScrapCompanyButton key={company.scrapingDate} />
            </div>

            <Grid>
              <Grid container justifyContent="center" marginTop={5} spacing={3}>
                <Grid md={4} xs={12}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 220,
                      maxWidth: 400,
                    }}
                  >
                    <DetailsCompany />
                  </Card>
                </Grid>
                <Grid md={4} xs={12}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 220,
                    }}
                  >
                    <ListOfLeaders />
                  </Card>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" marginTop={5} spacing={3}>
                <Grid md={4} xs={8}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
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
