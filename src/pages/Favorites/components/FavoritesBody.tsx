import useSetTableData from '@/components/parts/TableCompany/hooks/useSetTableData'
import {
  handleCopyToClipboard,
  handleOpenInNewTab,
} from '@/pages/Dashboard/dashboardPage.util'
import { useDashboardColumnsDef } from '@/pages/Dashboard/hooks/useDashboardColumnDef'
import { useUpdateStatus } from '@/pages/Dashboard/hooks/useUpdateStatus'
import { Card, Stack } from '@mui/joy'
import { Grid } from '@mui/material'
import { FC, useEffect } from 'react'

import Chart from '../../../components/parts/Chart/Chart'
import DetailsCompany from '../../../components/parts/DetailsCompany'
import ListOfLeaders from '../../../components/parts/LeaderList/LeaderList'
import TableCompany from '../../../components/parts/TableCompany/TableCompany'
import {
  CheckStatus,
  CompanyDTO,
  Page,
  PageCompanyDtoWithStatusDTO,
} from '../../../types/index.types'
import { DashboardColumnGenerics } from '../favorites.types'

type FavoritesBodyProps = {
  data: PageCompanyDtoWithStatusDTO | undefined
  error: Error | null
  setCompany: (company: CompanyDTO) => void
  company: CompanyDTO | undefined
  isPending: boolean
  pagination: {
    pageNumber: number
    totalPages: number
    handlePageChange: (newPage: Page) => void
  }
}

const FavoritesBody: FC<FavoritesBodyProps> = ({
  company,
  data,
  error,
  isPending,
  pagination,
  setCompany,
}) => {
  const [tableData, setTableData, updateCompanyData] = useSetTableData(data)

  useEffect(() => {
    if (data) setTableData(data)
  }, [data, setTableData])

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
    handleCopyToClipboard: handleCopyToClipboard,
    handleOpenInNewTab: handleOpenInNewTab,
    handleStatusChange,
  })

  return (
    <Grid container spacing={3}>
      <Grid item md={8} xs={12}>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            height: 550,
            borderRadius: 3,
            marginTop: '8px',
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
            isPending={isPending}
            pagination={{
              pageNumber: pagination.pageNumber,
              totalPages: pagination.totalPages,
              handlePageChange: pagination.handlePageChange,
            }}
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
          <ListOfLeaders siren={company?.sirenNumber} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default FavoritesBody
