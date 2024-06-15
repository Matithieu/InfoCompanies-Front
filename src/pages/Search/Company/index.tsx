import 'react-toastify/dist/ReactToastify.css'

import { Box, Card, Grid, IconButton, Typography } from '@mui/joy'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { GlobalErrorButton } from '../../../components/common/buttons/GlobalErrorButton.tsx'
import ScrapCompanyButton from '../../../components/common/buttons/scrapCompanyButton.tsx'
import { StatutIcon } from '../../../components/common/Icons/StatutIcon.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/ListOfLeaders/index.tsx'
import { CheckStatus, Company } from '../../../data/types/company.ts'
import { useCompanyStore } from '../../../store/companyStore.tsx'
import {
  fetchCompnayById,
  updateSeenCompany,
} from '../../../utils/api/index.ts'
import { manageIsChecked } from '../../../utils/manageIsChecked.tsx'

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

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
  })

  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckStatus

    switch (company.checked) {
      case CheckStatus.NOT_DONE:
        newStatus = CheckStatus.TO_DO
        mutation.mutate(company.id)
        break
      case CheckStatus.TO_DO:
        newStatus = CheckStatus.DONE
        break
      default:
        newStatus = CheckStatus.NOT_DONE
        mutation.mutate(company.id)
    }

    company.checked = newStatus
    manageIsChecked(company.id, newStatus)
    setCompany(company)
    setStatut(newStatus)
    return newStatus
  }

  if (error !== null && isError) {
    return <GlobalErrorButton error={error} />
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
