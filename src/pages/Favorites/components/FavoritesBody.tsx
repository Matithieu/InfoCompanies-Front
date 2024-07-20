import { Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { FC } from 'react'

import Chart from '../../../components/parts/Chart'
import DetailsCompany from '../../../components/parts/DetailsCompany'
import ListOfLeaders from '../../../components/parts/ListOfLeaders'
import TableCompany from '../../../components/parts/TableCompany'
import { Company } from '../../../data/types/company'
import { Page } from '../../../data/types/companyDetails'

type FavoritesBodyProps = {
  data: Page<Company> | null | undefined
  error: any
  handleChangePage: (page: number) => void
  setCompany: (company: any) => void
  company: any
  isPending: boolean
}

const FavoritesBody: FC<FavoritesBodyProps> = ({
  company,
  data,
  error,
  handleChangePage,
  isPending,
  setCompany,
}) => {
  return (
    <Grid container spacing={3} sx={{ px: { xs: 2, md: 6 } }}>
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
  )
}

export default FavoritesBody
