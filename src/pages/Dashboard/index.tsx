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
import { Company } from '../../data/types/company.ts'
import { RANDOM_UNSEEN_ENDPOINT } from '../../data/types/index.types.ts'
import joyrideMessages from '../../onboarding/joyride.messages.ts'
import joyrideSteps from '../../onboarding/steps.tsx'
import { formatMessage } from '../../services/intl/intl.tsx'
import useAuthStore from '../../store/authStore.tsx'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import { updateUserOnboarding } from '../../utils/api/mutations.ts'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/queries.ts'
import { constructURLWithFilter } from '../../utils/api/utils.ts'
import { returnInverseOfBoolean } from '../../utils/utils.ts'

const Dashboard: FC = () => {
  const { authUser, setAuthUser } = useAuthStore()
  const [isTourRunning, setIsTourRunning] = useState<boolean>(
    returnInverseOfBoolean(!!authUser?.hasCompletedOnboarding),
  )

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

  useEffect(() => {
    const changeURL = () => {
      let newUrl = ''

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
        newUrl = `${RANDOM_UNSEEN_ENDPOINT}?`
      } else {
        setDataPagination((prevDataPagination) => ({
          ...prevDataPagination,
          page: 0,
        }))
        newUrl = constructURLWithFilter(searchParams, 'filter-by-parameters?')
      }

      if (url !== newUrl) {
        setUrl(newUrl)
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
          back: formatMessage(joyrideMessages.back),
          close: formatMessage(joyrideMessages.close),
          last: formatMessage(joyrideMessages.last),
          next: formatMessage(joyrideMessages.next),
          skip: formatMessage(joyrideMessages.skip),
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

export default Dashboard
