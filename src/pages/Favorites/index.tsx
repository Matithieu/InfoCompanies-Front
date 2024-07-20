import { Card, Stack, Typography } from '@mui/joy'
import { Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { TableSkeleton } from '../../components/common/Loaders/Skeleton/index.tsx'
import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../components/parts/ListOfLeaders/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/type.ts'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { Company } from '../../data/types/company.ts'
import { fetchCompanyByIds } from '../../utils/api/index.ts'
import { companiesSeenStorage } from '../../utils/localStorage/companiesSeenStorage.ts'

const Favorites: FC = () => {
  const { companiesToDo } = companiesSeenStorage()
  const [company, setCompany] = useState<Company>()
  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isPending, data, error } = useQuery({
    queryKey: [
      'companies',
      dataPagination.page,
      companiesToDo.getCompaniesTodo(),
    ],
    queryFn: () =>
      fetchCompanyByIds(companiesToDo.getCompaniesTodo(), dataPagination.page),
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

  if (data?.content.length === 0) {
    return (
      <Typography
        sx={{
          fontSize: '19px',
          color: '#888',
          textAlign: 'center',
          mt: 2,
        }}
      >
        Aucun ToDO sélectionné
      </Typography>
    )
  }

  if (isPending) {
    return <TableSkeleton columns={columnsTableCompany} />
  }

  return (
    <>
      <Grid container spacing={3} sx={{ px: { xs: 2, md: 6 } }}>
        <Grid item xs={12}>
          <Typography component="h1" level="h1" sx={{ mt: 2, mb: 2 }}>
            Favoris
          </Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
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
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              justifyContent: 'center',
              minHeight: 200,
              borderRadius: 3,
              height: '100%',
            }}
          >
            <DetailsCompany company={company} />
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              justifyContent: 'center',
              height: 220,
              borderRadius: 3,
            }}
          >
            <Chart company={company} />
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              justifyContent: 'center',
              height: 220,
              borderRadius: 3,
            }}
          >
            <ListOfLeaders />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Favorites
