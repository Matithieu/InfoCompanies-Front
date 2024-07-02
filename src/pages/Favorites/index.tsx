import { Box, Card, Grid, Stack, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'

import { TableSkeleton } from '../../components/common/Loaders/Skeleton/index.tsx'
import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../components/parts/ListOfLeaders/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { companiesSeenStorage } from '../../utils/localStorage/companiesSeenStorage.ts'

export default function Favorites() {
  const { companiesToDo } = companiesSeenStorage()

  const [url, setUrl] = useState<string>('')
  const [checkedCompanies, setCheckedCompanies] = useState<number[]>([])

  useEffect(() => {
    const idsOfCheckedCompanies: number[] = companiesToDo.getCompaniesTodo()
    setCheckedCompanies(idsOfCheckedCompanies)

    if (idsOfCheckedCompanies.length > 0) {
      setUrl(`get-by-ids?ids=${idsOfCheckedCompanies.join(',')}&`)
    }
  }, [companiesToDo])

  const renderContent = () => {
    if (checkedCompanies.length === 0) {
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

    if (!url) {
      return <TableSkeleton columns={columnsTableCompany} />
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              minWidth: '60%',
              maxHeight: 550,
              borderRadius: 3,
            }}
          >
            <TableCompany url={url} />
          </Stack>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              borderRadius: 3,
              minWidth: '40%',
              maxWidth: '50%',
            }}
          >
            <DetailsCompany />
          </Card>
        </Box>

        <Grid container flexDirection="row" marginTop={5} spacing={3}>
          <Grid md={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 220,
                minWidth: '80%',
                borderRadius: 3,
              }}
            >
              <Chart />
            </Card>
          </Grid>
          <Grid md={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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

  return (
    <Grid>
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <Typography component="h1" level="h1" sx={{ mt: 2, mb: 2 }}>
          Favoris
        </Typography>
      </Box>
      <Grid container alignItems="center" px={{ xs: 2, md: 6 }} spacing={3}>
        <Grid lg={6} md={8} sm={6} xs={12}>
          <Grid container spacing={6}>
            <Grid md={8} xs={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
