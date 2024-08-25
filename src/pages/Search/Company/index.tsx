import 'react-toastify/dist/ReactToastify.css'

import { Box, Card, Grid, IconButton, Typography } from '@mui/joy'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GlobalErrorButton } from '../../../components/common/buttons/GlobalErrorButton.tsx'
import ScrapCompanyButton from '../../../components/common/buttons/scrapCompanyButton.tsx'
import StatutIcon from '../../../components/common/Icons/StatutIcon.tsx'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../../components/common/Icons/stautIcon.util.ts'
import Seo from '../../../components/common/Seo/index.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/ListOfLeaders/index.tsx'
import { Company } from '../../../data/types/company.ts'
import {
  fetchCompanyById,
  updateSeenCompany,
} from '../../../utils/api/index.ts'
import { asserts } from '../../../utils/assertion.util.ts'

const CompanyPage: FC = () => {
  const { companyId } = useParams()
  const [company, setCompany] = useState<Company>()
  asserts(companyId !== undefined, "companyId can't be undefined")

  const { isPending, data, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId),
  })

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
    onSuccess: () => {
      setCompany((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            ...updateCompaniesIcon([prevData]),
          }
        }

        return prevData
      })
    },
  })

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeStatut({
      company,
      mutation,
    })
    setCompany((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          updatedCompany,
        }
      }

      return prevData
    })
  }

  useEffect(() => {
    if (data !== null) {
      setCompany(data)
    }
  }, [data])

  if (error !== null) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending) {
    return <div>Chargement des données...</div>
  } else if (company !== null && company) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Seo
          description={`Details of ${company.companyName}`}
          title={company.companyName}
        />
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
                    handleStatusChange(company)
                  }}
                >
                  <StatutIcon statut={company.checked} />
                </IconButton>
                {company.companyName}
              </Typography>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ScrapCompanyButton
                company={company}
                onScraped={(updatedCompany) => {
                  setCompany(updatedCompany)
                }}
              />
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
                    <DetailsCompany company={company} />
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
                    <ListOfLeaders siren={company.sirenNumber} />
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
                    <Chart company={company} />
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

export default CompanyPage
