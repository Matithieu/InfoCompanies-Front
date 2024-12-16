import usePagination from '@/hooks/usePagination.tsx'
import { Grid, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import { Company } from '../../data/types/company.ts'
import { formatMessage } from '../../services/intl/intl.tsx'
import { fetchFavorites } from '../../utils/api/queries.ts'
import FavoritesBody from './components/FavoritesBody.tsx'
import favoritesMessages from './favorites.messages.ts'

const FavoritesPage: FC = () => {
  const [company, setCompany] = useState<Company>()
  const [pagination, setPagination] = usePagination()

  const { data, error, isPending } = useQuery({
    queryKey: ['favorites-companies', pagination.page],
    queryFn: () => fetchFavorites(pagination.page),
    refetchOnMount: true,
    staleTime: Infinity,
  })

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
          handleChangePage={setPagination}
          isPending={isPending}
          setCompany={setCompany}
        />
      )}
    </Grid>
  )
}

export default FavoritesPage
