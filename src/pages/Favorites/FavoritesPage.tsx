import usePagination from '@/hooks/usePagination'
import { CompanyDTO } from '@/types/index.types'
import { Grid, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage } from '../../services/intl/intl'
import { fetchFavorites } from '../../utils/api/queries'
import FavoritesBody from './components/FavoritesBody'
import favoritesMessages from './favorites.messages'

const FavoritesPage: FC = () => {
  const [company, setCompany] = useState<CompanyDTO>()
  const [pagination, setPagination] = usePagination()

  const { data, error, isPending } = useQuery({
    queryKey: ['favorites-companies', pagination.page],
    queryFn: () => fetchFavorites({ page: pagination.page }),
    refetchOnMount: true,
    staleTime: 0,
  })

  useEffect(() => {
    if (data)
      setPagination((prev) => ({ ...prev, totalPages: data.totalPages }))
  }, [data, setPagination])

  return (
    <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
      <HeaderTitle text="Favoris" />

      {data?.content.length === 0 ? (
        <Typography
          sx={{
            fontSize: '19px',
            color: '#888',
            ml: 3,
            mt: 2,
          }}
        >
          {formatMessage(favoritesMessages.noCompanyInToDo)}
        </Typography>
      ) : (
        <FavoritesBody
          company={company}
          data={data}
          error={error}
          isPending={isPending}
          pagination={{
            pageNumber: pagination.page,
            totalPages: pagination.totalPages,
            handlePageChange: setPagination,
          }}
          setCompany={setCompany}
        />
      )}
    </Grid>
  )
}

export default FavoritesPage
