import usePagination from '@/hooks/usePagination.tsx'
import { asserts, isNotNU } from '@/utils/assertion.util.ts'
import { Box, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router'

import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import TableCompany from '../../components/parts/TableCompany/TableCompany.tsx'
import { columnsTableCompanySearch } from '../../data/types/columns.ts'
import { useAppNavigate } from '../../hooks/useAppNavigate.tsx'
import { formatMessage } from '../../services/intl/intl.tsx'
import { fetchCompanyBySearchTerm } from '../../utils/api/queries.ts'
import searchMessages from './search.messages.ts'

const SearchPage: FC = () => {
  const { searchTerm } = useParams()
  asserts(isNotNU(searchTerm))

  // Extract the current page from the URL query params
  const queryParams = new URLSearchParams(location.search)
  const currentPage = Number(queryParams.get('page')) || 0

  const [pagination, setPagination] = usePagination(currentPage)
  const { navigation } = useAppNavigate()

  const { isPending, data, error } = useQuery({
    queryKey: ['search-page', searchTerm, pagination.page],
    queryFn: () => fetchCompanyBySearchTerm(searchTerm, pagination.page),
    staleTime: Infinity,
  })

  const handleChangePage = (page: number) => {
    setPagination(page)
    navigation.toPage(`?page=${page}`, { replace: true })
  }

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
            <TableCompany
              columns={columnsTableCompanySearch}
              data={data}
              error={error}
              handleChangePage={handleChangePage}
              handleDetailsClick={(company) => {
                navigation.toCompany(company.id.toString())
              }}
              isCheckboxVisible={false}
              isPending={isPending}
              isScrapping={false}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SearchPage
