import { useAppNavigate } from '@/hooks/useAppNavigate'
import usePagination from '@/hooks/usePagination'
import { asserts, isNotNU } from '@/utils/assertion.util'
import { Box, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import TableCompany from '../../components/parts/TableCompany/TableCompany'
import { formatMessage } from '../../services/intl/intl'
import { fetchCompanyByCompanyName } from '../../utils/api/queries'
import { handleOpenInNewTab } from '../Dashboard/dashboardPage.util'
import { useSearchColumnsDef } from './hooks/useSearchColumnDef'
import searchMessages from './search.messages'
import { SearchColumnGenerics } from './search.types'

const SearchPage: FC = () => {
  const { searchTerm } = useParams()
  asserts(isNotNU(searchTerm))

  const [pagination, setPagination] = usePagination()
  const { navigation } = useAppNavigate()

  const { isPending, data, error } = useQuery({
    queryKey: ['search-page', searchTerm, pagination.page],
    queryFn: () =>
      fetchCompanyByCompanyName({
        companyName: searchTerm,
        page: pagination.page,
      }),
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data)
      setPagination((prev) => ({ ...prev, totalPages: data.totalPages }))
  }, [data, setPagination])

  const landingColumnsDef = useSearchColumnsDef({ handleOpenInNewTab })

  return (
    <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
      <HeaderTitle
        text={formatMessage(searchMessages.companyFor, {
          searchValue: searchTerm,
        })}
      />
      <Grid md={4} sm={6} sx={{ marginBottom: 7.2 }} xs={12} />
      <Grid container justifyContent="center">
        <Grid md={12} xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 320,
              height: '100%',
              width: '100%',
              margin: 'auto',
            }}
          >
            <TableCompany<
              SearchColumnGenerics['TId'],
              SearchColumnGenerics['FSubId'],
              SearchColumnGenerics['TRow']
            >
              columns={landingColumnsDef}
              data={data?.content}
              error={error}
              handleRowClick={({ id }) => navigation.toCompany(id)}
              isPending={isPending}
              pagination={{
                pageNumber: pagination.page,
                totalPages: pagination.totalPages,
                handlePageChange: setPagination,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SearchPage
