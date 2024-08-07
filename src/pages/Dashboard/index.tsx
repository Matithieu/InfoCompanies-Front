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
    queryKey: ['companies', url, dataPagination, searchParams],
    queryFn: () => fetchCompaniesWithUrlAndPage(url, dataPagination.page),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  })

  const handleChangePage = (page: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: page,
    }))
  }

  useEffect(() => {
    const changeURL = () => {
      if (
        searchParams.city.length === 0 &&
        searchParams.industrySector.length === 0 &&
        searchParams.legalForm.length === 0 &&
        searchParams.region.length === 0
      ) {
        setUrl(`${RANDOM_UNSEEN_ENDPOINT}?`)
        return
      } else {
        let url = 'filter-by-parameters?'

        if (searchParams.region.length > 0) {
          url += `regions=${searchParams.region.join(',')}&`
        }

        if (searchParams.city.length > 0) {
          url += `cities=${searchParams.city.map((city) => city.name).join(',')}&`
        }

        if (searchParams.industrySector.length > 0) {
          url += `industrySectors=${searchParams.industrySector.map((sector) => sector.name).join(',')}&`
        }

        if (searchParams.legalForm.length > 0) {
          url += `legalForms=${searchParams.legalForm.map((form) => form.name).join(',')}&`
        }

        setUrl(url)
      }
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

      <Grid item lg={3} md={4} paddingLeft={8} sm={6} xs={12}>
        <Filters />
      </Grid>

      <Grid
        container
        justifyContent="center"
        paddingLeft={10}
        paddingRight={10}
      >
        {/* Container on the first row */}
        <Grid item lg={11} md={11} sm={10} xs={12}>
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
          <Grid item lg={10} md={12} sm={12} xl={4} xs={12}>
            <Card sx={{ minHeight: 220 }}>
              <DetailsCompany company={company} />
            </Card>
          </Grid>

          {/* Leaders of the company */}
          <Grid item lg={10} md={12} sm={12} xl={4} xs={12}>
            <Card sx={{ minHeight: 220 }}>
              <ListOfLeaders siren={company?.sirenNumber} />
            </Card>
          </Grid>

          {/* Chart of the company */}
          <Grid item lg={10} md={12} sm={12} xl={4} xs={12}>
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
