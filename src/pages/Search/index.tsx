import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Box,
  Grid,
  IconButton,
  iconButtonClasses,
  Sheet,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { GlobalErrorButton } from '../../components/common/buttons/GlobalErrorButton.tsx'
import Seo from '../../components/common/Seo/index.tsx'
import { CompanyDetails, Page } from '../../data/types/companyDetails.ts'
import { fetchCompanyBySearchTerm } from '../../utils/api/index.ts'
import { useAppNavigate } from '../../utils/navigation/navigation.tsx'

async function fetchCompanies(searchTerm: string, page: number) {
  const response = await fetchCompanyBySearchTerm(searchTerm, page)

  if (response) {
    const data: Page<CompanyDetails> = response
    return data
  }
}

/**
 *
 * @returns A table of companies with their details for the search page
 */
function TableOfDetails() {
  const { navigation } = useAppNavigate()

  const { searchTerm } = useParams()

  const [dataPagniation, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['companies', searchTerm, dataPagniation.page],
    queryFn: () => fetchCompanies(searchTerm ?? '', dataPagniation.page),
    retry: 1,
    refetchOnWindowFocus: false,
  })

  // Reset the page number to 0 when searchTerm changes
  useEffect(() => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: 0,
    }))
  }, [searchTerm])

  // Update the total pages when data changes
  useEffect(() => {
    if (data !== null && data) {
      setDataPagination((prevDataPagination) => ({
        ...prevDataPagination,
        totalPages: data.totalPages,
      }))
    }
  }, [data])

  const handleChangePage = (newPage: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: newPage,
    }))
  }

  if (error !== null && isError) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending || data === undefined) {
    return (
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          height: '200px',
        }}
      >
        <h1>Chargement des données...</h1>
      </div>
    )
  } else if (data.empty) {
    return (
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          height: '200px',
        }}
      >
        <h1>Aucune entreprise trouvée</h1>
      </div>
    )
  } else if (data.empty === false) {
    return (
      <React.Fragment>
        <Seo
          description={`Recherche: ${searchTerm}`}
          title={`Recherche: ${searchTerm}`}
        />
        <Sheet
          aria-label="order-table-container"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            minHeight: 0,
          }}
          variant="outlined"
        >
          <Table
            hoverRow
            stickyHeader
            aria-labelledby="tableTitle"
            sx={{
              '--TableCell-headBackground':
                'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground':
                'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
            }}
          >
            <thead>
              <tr style={{ fontSize: 16, alignItems: 'left' }}>
                <th align="left"></th>
                <th align="left">Dénomination</th>
                <th align="center">Secteur d&apos;activité</th>
                <th align="center">Ville</th>
                <th align="center">Region</th>
              </tr>
            </thead>
            <tbody>
              {data.content.map((row: CompanyDetails) => (
                <tr
                  key={row.id}
                  id={`company-${row.id}`}
                  style={{ cursor: 'pointer', alignItems: 'left' }}
                  onClick={() => {
                    navigation.toCompany(row.id.toString())
                  }}
                >
                  <td align="left">
                    <ApartmentOutlinedIcon />
                  </td>
                  <td scope="row">{row.companyName}</td>
                  <td align="center">{row.industrySector}</td>
                  <td align="center">{row.city}</td>
                  <td align="center">{row.region}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Box>
          <Box
            sx={{
              pt: 2,
              gap: 1,
              [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Tooltip title="Page précédente">
                <IconButton
                  color="neutral"
                  disabled={dataPagniation.page === 0}
                  size="sm"
                  sx={{ bgcolor: 'background.surface' }}
                  variant="outlined"
                  onClick={() => handleChangePage(dataPagniation.page - 1)}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Tooltip>
              <Typography level="body-md">
                {dataPagniation.page + 1} / {dataPagniation.totalPages}
              </Typography>
              <Tooltip title="Page suivante">
                <IconButton
                  color="neutral"
                  disabled={
                    dataPagniation.page === dataPagniation.totalPages - 1
                  }
                  size="sm"
                  sx={{ bgcolor: 'background.surface' }}
                  variant="outlined"
                  onClick={() => handleChangePage(dataPagniation.page + 1)}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    )
  }
}

/**
 *
 * @returns The search page
 */
export default function Search() {
  const { searchTerm } = useParams()

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography component="h1" level="h1" style={{ marginTop: 20 }}>
          Entreprises pour &quot;{searchTerm}&quot;
        </Typography>
      </Box>
      <Grid
        container
        justifyContent="center"
        marginTop="7.8vh"
        paddingBottom="10vh"
        paddingLeft={8}
        paddingRight={10}
        spacing={3}
      >
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
              margin: 'auto', // Center horizontally
            }}
          >
            <TableOfDetails />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
