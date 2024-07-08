import 'react-toastify/dist/ReactToastify.css'

import { Box, Card, Grid, IconButton, Typography } from '@mui/joy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { GlobalErrorButton } from '../../../components/common/buttons/GlobalErrorButton.tsx'
import ScrapCompanyButton from '../../../components/common/buttons/scrapCompanyButton.tsx'
import { StatutIcon } from '../../../components/common/Icons/StatutIcon.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/ListOfLeaders/index.tsx'
import { Company } from '../../../data/types/company.ts'
import { useCompanyStore } from '../../../store/companyStore.tsx'
import {
  fetchCompanyById,
  updateSeenCompany,
} from '../../../utils/api/index.ts'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../../components/common/Icons/stautIcon.util.ts'
import { asserts } from '../../../utils/assertion.util.ts'

export default function CompanyPage() {
  const queryClient = useQueryClient()
  const [company, setCompany] = useState<Company>({} as Company)

  const { companyId } = useParams()
  asserts(companyId !== undefined, "companyId can't be undefined")

  const { setSelectedCompany } = useCompanyStore()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId),
    initialData: () => {
      const cachedData = queryClient.getQueryData<Company>([
        'company',
        companyId,
      ])

      if (cachedData) {
        return updateCompaniesIcon([cachedData])[0]
      }

      return undefined
    },
  })

  useEffect(() => {
    if (data) {
      const updatedData = updateCompaniesIcon([data])[0] // Update the icon
      queryClient.setQueryData(['company', companyId], updatedData)
      setSelectedCompany(updatedData)
      setCompany(updatedData)
    }
  }, [data, setSelectedCompany, companyId, queryClient])

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
  })

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
                    company.checked = handleChangeStatut({
                      company: company,
                      mutation,
                      setCompany,
                    })
                  }}
                >
                  <StatutIcon statut={company.checked} />
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
