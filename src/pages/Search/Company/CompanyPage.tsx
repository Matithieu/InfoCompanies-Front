import 'react-toastify/dist/ReactToastify.css'

import { Box, Card, Grid, IconButton, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GlobalErrorButton } from '../../../components/common/Buttons/GlobalErrorButton.tsx'
import ScrapCompanyButton from '../../../components/common/Buttons/scrapCompanyButton.tsx'
import StatutIcon from '../../../components/common/Icons/StatutIcon.tsx'
import { handleChangeStatut } from '../../../components/common/Icons/stautIcon.util.ts'
import Seo from '../../../components/common/Seo/index.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/LeaderList/LeaderList.tsx'
import { Company } from '../../../data/types/company.ts'
import commonMessages from '../../../services/intl/common.messages.ts'
import { formatMessage } from '../../../services/intl/intl.tsx'
import { fetchCompanyById } from '../../../utils/api/queries.ts'
import { asserts, isNotNU } from '../../../utils/assertion.util.ts'

const CompanyPage: FC = () => {
  const { companyId } = useParams()
  const [company, setCompany] = useState<Company>()
  asserts(companyId !== undefined, "companyId can't be undefined")

  const { isPending, data, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId),
  })

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeStatut({ company })

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
    return <p>{formatMessage(commonMessages.loading)}</p>
  } else if (isNotNU(company)) {
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
          <div key={company.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Typography
                level="h1"
                sx={{
                  alignSelf: 'flex-start',
                }}
              >
                <IconButton
                  size="lg"
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleStatusChange(company)
                  }}
                >
                  <StatutIcon
                    companyId={company.id}
                    statut={company.userCompanyStatus.status}
                    style={{ fontSize: '1.5rem' }}
                  />
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

            <div style={{ marginTop: '100px' }} />

            <Grid
              container
              direction="row"
              display="flex"
              justifyContent="center"
              spacing={2}
            >
              <Grid lg={8} md={8} sm={8} xl={4} xs={8}>
                <Card sx={{ minHeight: 220 }}>
                  <DetailsCompany company={company} />
                </Card>
              </Grid>

              <Grid lg={8} md={8} sm={8} xl={4} xs={8}>
                <Card sx={{ minHeight: 220 }}>
                  <ListOfLeaders siren={company?.sirenNumber} />
                </Card>
              </Grid>

              <Grid lg={8} md={8} sm={8} xl={5} xs={8}>
                <Card
                  sx={{
                    height: 220,
                    minWidth: 1,
                  }}
                >
                  <Chart company={company} />
                </Card>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
    )
  }
}

export default CompanyPage
