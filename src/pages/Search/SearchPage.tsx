import { Box, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import TableCompany from '../../components/parts/TableCompany/TableCompany.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/tableCompany.type.ts'
import { columnsTableCompanySearch } from '../../data/types/columns.ts'
import { useAppNavigate } from '../../hooks/useAppNavigate.tsx'
import { formatMessage } from '../../services/intl/intl.tsx'
import { fetchCompanyBySearchTerm } from '../../utils/api/queries.ts'
import searchMessages from './search.messages.ts'

const SearchPage: FC = () => {
  const { navigation } = useAppNavigate()
  const { searchTerm } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Extract the current page from the URL query params
  const queryParams = new URLSearchParams(location.search)
  const currentPage = Number(queryParams.get('page')) || 0

  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: currentPage,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', searchTerm, dataPagination.page],
    queryFn: () =>
      fetchCompanyBySearchTerm(searchTerm ?? '', dataPagination.page),
    refetchOnWindowFocus: false,
  })

  // Update page in the state and URL
  const handleChangePage = (page: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: page,
    }))

    navigate(`?page=${page}`, { replace: true })
  }

  useEffect(() => {
    // Sync the page state with the URL when the component mounts
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: currentPage,
    }))
  }, [currentPage])

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
