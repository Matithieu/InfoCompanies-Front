import usePagination from '@/hooks/usePagination.tsx'
import { Box, Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import Chart from '../../components/parts/Chart/Chart.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import Filters from '../../components/parts/Filters/index.tsx'
import ListOfLeaders from '../../components/parts/LeaderList/LeaderList.tsx'
import TableCompany from '../../components/parts/TableCompany/TableCompany.tsx'
import JoyRideOnboardingProvider from '../../containers/JoyRide/index.tsx'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { Company } from '../../data/types/company.ts'
import { useCompanyFilterStore } from '../../stores/filtersStore.tsx'
import useUserStore from '../../stores/userStore.tsx'
import { updateUserOnboarding } from '../../utils/api/mutations.ts'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/queries.ts'
import useFilteredUrl from './hooks/useFilteredUrl.tsx'

const DashboardPage: FC = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [company, setCompany] = useState<Company>()
  const [pagination, setPagination] = usePagination()

  const { user, setUser } = useUserStore()
  const { searchParams } = useCompanyFilterStore()

  const { isLoading, data, error } = useQuery({
    queryKey: ['companies', url, pagination.page],
    queryFn: () => fetchCompaniesWithUrlAndPage(url!, pagination.page),
    staleTime: Infinity,
    enabled: !!url,
  })

  const onboardingMutation = useMutation({
    mutationFn: () => updateUserOnboarding(),
  })

  useFilteredUrl({ searchParams, url, setPagination, setUrl })

  return (
    <>
      <JoyRideOnboardingProvider
        onboardingMutation={onboardingMutation}
        setUser={setUser}
        user={user}
      />
      <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
        <HeaderTitle text="Dashboard" />

        <Box mt={1}>
          <Grid item md={4} sm={6} sx={{ marginBottom: 2 }} xs={12}>
            <Filters
              showAddFilterButton
              filtersToShow={[
                'city',
                'region',
                'industrySector',
                'legalForm',
                'employee',
                'socials',
                'contact',
                'isCompanySeen',
              ]}
            />
          </Grid>

          <Grid container justifyContent="center">
            {/* Container on the first row */}
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  minHeight: 530,
                  maxHeight: 530,
                  borderRadius: 3,
                }}
              >
                <TableCompany
                  isCheckboxVisible
                  columns={columnsTableCompany}
                  data={data}
                  error={error}
                  isPending={isLoading}
                  // temporary, need to pay some proxy to get the data
                  isScrapping={false}
                  onCompanyDetailsClick={(company) => setCompany(company)}
                  onPageChange={setPagination}
                />
              </Stack>
            </Grid>

            {/* Container on the second row */}
            <Grid
              container
              aria-label="tabs"
              justifyContent="center"
              spacing={1}
            >
              {/* DetailsCompany of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                <Card sx={{ minHeight: 220 }}>
                  <DetailsCompany company={company} />
                </Card>
              </Grid>

              {/* Leaders of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                <Card sx={{ minHeight: 220 }}>
                  <ListOfLeaders siren={company?.sirenNumber} />
                </Card>
              </Grid>

              {/* Chart of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
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
        </Box>
      </Grid>
    </>
  )
}

export default DashboardPage
