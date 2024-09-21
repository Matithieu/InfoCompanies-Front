import './style.css'

import { Box, Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

import Seo from '../../components/common/Seo/index.tsx'
import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import Filters from '../../components/parts/Filters/index.tsx'
import ListOfLeaders from '../../components/parts/ListOfLeaders/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/type.ts'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { RANDOM_UNSEEN_ENDPOINT } from '../../data/types/common.ts'
import { Company } from '../../data/types/company.ts'
import joyrideSteps from '../../onboarding/steps.tsx'
import useAuthStore from '../../store/authStore.tsx'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import {
  fetchCompaniesWithUrlAndPage,
  updateUserOnboarding,
} from '../../utils/api/index.ts'
import { constructURLWithFilter } from '../../utils/api/util.ts'
import { returnInverseOfBoolean } from '../../utils/utils.ts'

const Dashboard: FC = () => {
  const { authUser, setAuthUser } = useAuthStore()
  const [isTourRunning, setIsTourRunning] = useState<boolean>(
    returnInverseOfBoolean(!!authUser?.hasCompletedOnboarding),
  )

  const { searchParams } = useCompanyFilterStore()
  const [company, setCompany] = useState<Company>()
  const [url, setUrl] = useState(`${RANDOM_UNSEEN_ENDPOINT}?`)
  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isLoading, data, error } = useQuery({
    queryKey: ['companies', url, dataPagination, searchParams],
    queryFn: () => fetchCompaniesWithUrlAndPage(url, dataPagination.page),
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  })

  const onboardingMutation = useMutation({
    mutationFn: () => updateUserOnboarding(),
    retry: 0,
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
        searchParams.region.length === 0 &&
        searchParams.employee.amount === undefined &&
        searchParams.socials.length === 0 &&
        searchParams.contact.length === 0 &&
        searchParams.isCompanySeen === false
      ) {
        setDataPagination((prevDataPagination) => ({
          ...prevDataPagination,
          page: 0,
        }))
        setUrl(`${RANDOM_UNSEEN_ENDPOINT}?`)
        return
      } else {
        setDataPagination((prevDataPagination) => ({
          ...prevDataPagination,
          page: 0,
        }))
        setUrl(constructURLWithFilter(searchParams, 'filter-by-parameters?'))
      }
    }

    changeURL()
  }, [searchParams])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setIsTourRunning(false)
      setAuthUser({ ...authUser, hasCompletedOnboarding: true })
      onboardingMutation.mutate()
    }
  }

  return (
    <>
      <Joyride
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        locale={{
          back: 'Retour',
          close: 'Fermer',
          last: 'Go !',
          next: 'Suivant',
          skip: 'Skip',
        }}
        run={isTourRunning}
        steps={joyrideSteps}
        styles={{
          options: {
            zIndex: 3000,
          },
        }}
      />
      <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
        <Seo
          description="Dashboard"
          name="Dashboard"
          title="Dashboard"
          type="Dashboard"
        />
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
                  minHeight: 550,
                  maxHeight: 550,
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

            {/* Container on the second row */}
            <Grid
              container
              aria-label="tabs"
              justifyContent="center"
              marginTop={2}
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

export default Dashboard
