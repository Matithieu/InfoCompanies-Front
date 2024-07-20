import './style.css'

import { Box, Card, Stack, Typography } from '@mui/joy'
import { Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import Seo from '../../components/common/Seo/index.tsx'
import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import Filters from '../../components/parts/Filters/index.tsx'
import ListOfLeaders from '../../components/parts/ListOfLeaders/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/type.ts'
import { RANDOM_UNSEEN_ENDPOINT } from '../../data/types/common.ts'
import { Company } from '../../data/types/company.ts'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/index.ts'

const Dashboard: FC = () => {
  const { searchParams } = useCompanyFilterStore()
  const [company, setCompany] = useState<Company>()
  const [url, setUrl] = useState(`${RANDOM_UNSEEN_ENDPOINT}?`)
  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', url, dataPagination.page, searchParams],
    queryFn: () => fetchCompaniesWithUrlAndPage(url, dataPagination.page),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  })

  const handleChangePage = (page: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page,
    }))
  }

  useEffect(() => {
    const changeURL = () => {
      if (
        searchParams.activityArea.length === 0 &&
        searchParams.region.length === 0 &&
        searchParams.legalStatus.length === 0
      ) {
        setUrl(`${RANDOM_UNSEEN_ENDPOINT}?`)
        return
      }

      setUrl(
        `filter-by-parameters?sector=${searchParams.activityArea}&region=${searchParams.region}&`,
      )
    }

    changeURL()
  }, [searchParams])

  return (
    <Grid flexDirection="column">
      <Seo
        description="Dashboard"
        name="Dashboard"
        title="Dashboard"
        type="Dashboard"
      />
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography level="h1" style={{ marginTop: 20 }}>
          Dashboard
        </Typography>
      </Box>

      <Grid lg={3} md={4} paddingLeft={8} sm={6} xs={12}>
        <Filters />
      </Grid>

      <Grid
        container
        justifyContent="center"
        paddingLeft={10}
        paddingRight={10}
      >
        {/* Container on the first row */}
        <Grid lg={11} md={11} sm={10} xs={12}>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight: 550,
              maxHeight: 550,

              borderRadius: 3,
            }}
          >
            <TableCompany
              data={data}
              error={error}
              handleChangePage={handleChangePage}
              handleDetailsClick={(company) => setCompany(company)}
              isPending={isPending}
            />
          </Stack>
        </Grid>

        {/* Container on the second row */}
        <Grid
          container
          aria-label="tabs"
          justifyContent="center"
          marginTop={5}
          spacing={1}
        >
          {/* DetailsCompany of the company */}
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Card sx={{ minHeight: 220 }}>
              <DetailsCompany company={company} />
            </Card>
          </Grid>

          {/* Leaders of the company */}
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Card sx={{ minHeight: 220 }}>
              <ListOfLeaders />
            </Card>
          </Grid>

          {/* Chart of the company */}
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Card
              sx={{
                height: 220,
                minWidth: 1,
              }}
            >
              <Chart company={company} />
            </Card>
          </Grid>
          {/* . */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard
