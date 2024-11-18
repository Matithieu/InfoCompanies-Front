import './style.css'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'
import { Box, Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import Filters from '../../components/parts/Filters/index.tsx'
import ListOfLeaders from '../../components/parts/LeaderList/LeaderList.tsx'
import TableCompany from '../../components/parts/TableCompany/TableCompany.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/tableCompany.type.ts'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { Company } from '../../data/types/company.ts'
import JoyRideOnboarding from '../../onboarding/containers/JoyRide.tsx'
import useAuthStore from '../../store/authStore.tsx'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import { updateUserOnboarding } from '../../utils/api/mutations.ts'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/queries.ts'
import useFilteredUrl from './hooks/useFilteredUrl.tsx'

const DashboardPage: FC = () => {
  const { authUser, setAuthUser } = useAuthStore()

  const { searchParams } = useCompanyFilterStore()
  const [company, setCompany] = useState<Company>()
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isLoading, data, error } = useQuery({
    queryKey: ['companies', url, dataPagination.page],
    queryFn: () => fetchCompaniesWithUrlAndPage(url!, dataPagination.page),
    staleTime: Infinity,
    enabled: !!url,
  })

  const onboardingMutation = useMutation({
    mutationFn: () => updateUserOnboarding(),
  })

  const handleChangePage = (page: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: page,
    }))
  }

  useFilteredUrl({
    searchParams,
    url,
    setDataPagination,
    setUrl,
  })

  return (
    <>
      <JoyRideOnboarding
        authUser={authUser}
        onboardingMutation={onboardingMutation}
        setAuthUser={setAuthUser}
      />
      <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
        <Breadcrumb className="py-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ui/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
                  handleChangePage={handleChangePage}
                  handleDetailsClick={(company) => setCompany(company)}
                  isPending={isLoading}
                  // temporary, need to pay some proxy to get the data
                  isScrapping={false}
                />
              </Stack>
            </Grid>

            {/* Container on the second row 
              To Refactor: the cards should be in a separate component
            */}
            <Grid
              container
              aria-label="tabs"
              justifyContent="center"
              spacing={1}
            >
              {/* DetailsCompany of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                <Card
                  sx={{ minHeight: 220, borderColor: 'hsl(var(--primary))' }}
                >
                  <DetailsCompany company={company} />
                </Card>
              </Grid>

              {/* Leaders of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                <Card
                  sx={{ minHeight: 220, borderColor: 'hsl(var(--primary))' }}
                >
                  <ListOfLeaders siren={company?.sirenNumber} />
                </Card>
              </Grid>

              {/* Chart of the company */}
              <Grid item lg={4} md={12} sm={12} xl={4} xs={12}>
                <Card
                  sx={{
                    height: 220,
                    minWidth: 1,
                    borderColor: 'hsl(var(--primary))',
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
