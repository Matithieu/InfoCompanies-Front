import { Grid, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle.tsx'
import { PaginationTableCompany } from '../../components/parts/TableCompany/type.ts'
import { Company } from '../../data/types/company.ts'
import { fetchFavorites } from '../../utils/api/index.ts'
import FavoritesBody from './components/FavoritesBody.tsx'

const Favorites: FC = () => {
  const [company, setCompany] = useState<Company>()
  const [dataPagination, setDataPagination] = useState<PaginationTableCompany>({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { data, error, isPending } = useQuery({
    queryKey: ['companies', dataPagination.page],
    queryFn: () => fetchFavorites(dataPagination.page),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  })

  const handleChangePage = (page: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page,
    }))
  }

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
          Aucune entreprise en To Do !
        </Typography>
      ) : (
        <FavoritesBody
          company={company}
          data={data}
          error={error}
          handleChangePage={handleChangePage}
          isPending={isPending}
          setCompany={setCompany}
        />
      )}
    </Grid>
  )
}

export default Favorites
