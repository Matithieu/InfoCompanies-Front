import useSetTableData from '@/components/parts/TableCompany/hooks/useSetTableData'
import usePagination from '@/hooks/usePagination'
import { CheckStatus, CompanyDTO } from '@/types/index.types'
import { Box, Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import Chart from '../../components/parts/Chart/Chart'
import DetailsCompany from '../../components/parts/DetailsCompany/index'
import Filters from '../../components/parts/Filters/Filters'
import ListOfLeaders from '../../components/parts/LeaderList/LeaderList'
import TableCompany from '../../components/parts/TableCompany/TableCompany'
import JoyRideOnboardingProvider from '../../containers/JoyRide/index'
import { useCompanyFilterStore } from '../../stores/FiltersStore'
import useUserStore from '../../stores/UserStore'
import { updateUserOnboarding } from '../../utils/api/mutations'
import { DashboardColumnGenerics } from './dashboard.types'
import {
  handleCopyToClipboard,
  handleOpenInNewTab,
  selectQueryForDashboard,
} from './dashboardPage.util'
import { useDashboardColumnsDef } from './hooks/useDashboardColumnDef'
import { useScrapCompanyBatch } from './hooks/useScrapCompanyBatch'
import { useUpdateStatus } from './hooks/useUpdateStatus'

const DashboardPage: FC = () => {
  const [company, setCompany] = useState<CompanyDTO>()
  const [pagination, setPagination] = usePagination()
  const { user, setUser } = useUserStore()
  const { filterValues } = useCompanyFilterStore()
  const queryClient = useQueryClient()

  // As we have the useEffect next, it re-trigger the query when pagination changes
  const { page } = pagination
  const { isLoading, data, error } = useQuery({
    queryKey: ['companies', filterValues, page],
    queryFn: () =>
      selectQueryForDashboard({ searchParams: filterValues, page }),
    staleTime: Infinity,
  })

  const [tableData, setTableData, updateCompanyData] = useSetTableData(data)

  useEffect(() => {
    if (data) {
      setTableData(data)
      setPagination((prev) => ({ ...prev, totalPages: data.totalPages }))
    }
  }, [data, setTableData, pagination.totalPages, setPagination])

  const onboardingMutation = useMutation({
    mutationFn: () => updateUserOnboarding(),
  })

  const updateStatusMutation = useUpdateStatus({ updateCompanyData })

  const handleStatusChange = async (
    companyDTO: CompanyDTO,
    newStatus: CheckStatus,
  ) => {
    updateStatusMutation.mutate({
      companyDTO,
      status: newStatus,
    })
  }

  const dashboardColumnsDef = useDashboardColumnsDef({
    handleCopyToClipboard,
    handleOpenInNewTab,
    handleStatusChange,
  })

  const isScrapping = false // temporary, need to pay some proxy to get the data

  if (isScrapping) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrapCompanyBatch({
      queryClient,
      tableData,
      updateCompanyData,
    })
  }

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
                'cityNames',
                'regionNames',
                'industrySectorNames',
                'numberOfEmployeeFilter',
                'socials',
                'contacts',
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
                  height: 530,
                  borderRadius: 3,
                }}
              >
                <TableCompany<
                  DashboardColumnGenerics['TId'],
                  DashboardColumnGenerics['FSubId'],
                  DashboardColumnGenerics['TRow']
                >
                  columns={dashboardColumnsDef}
                  data={tableData?.content}
                  error={error}
                  handleRowClick={({ companyDTO }) => setCompany(companyDTO)}
                  isPending={isLoading}
                  pagination={{
                    pageNumber: pagination.page,
                    totalPages: pagination.totalPages,
                    handlePageChange: setPagination,
                  }}
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
