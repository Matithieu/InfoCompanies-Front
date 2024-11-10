import 'react-toastify/dist/ReactToastify.css'

import LoadingText from '@/components/common/Loading/TextLoading.tsx'
import { Box, Card, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { GlobalErrorButton } from '../../../components/common/Buttons/GlobalErrorButton.tsx'
import ScrapCompanyButton from '../../../components/common/Buttons/scrapCompanyButton.tsx'
import Chart from '../../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../../components/parts/LeaderList/LeaderList.tsx'
import { Company } from '../../../data/types/company.ts'
import { fetchCompanyById } from '../../../utils/api/queries.ts'
import { asserts, isNotNU } from '../../../utils/assertion.util.ts'
import CompanyHeader from './components/CompanyHeader.tsx'

const CompanyPage: FC = () => {
  const { companyId } = useParams()
  const [company, setCompany] = useState<Company>()
  asserts(companyId !== undefined, "companyId can't be undefined")

  const { isPending, data, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById(companyId),
  })

  useEffect(() => {
    if (data !== null) {
      setCompany(data)
    }
  }, [data])

  if (error !== null) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending) {
    return <LoadingText error={error} />
  } else if (isNotNU(company)) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <CompanyHeader company={company} setCompany={setCompany} />

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
        </Box>
      </Box>
    )
  }
}

export default CompanyPage
