import './style.css'

import { IconButton, Sheet, Table } from '@mui/joy'
import { useMutation, useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useEffect } from 'react'

import { columnsTableCompany } from '../../../data/types/columns.ts'
import { Company } from '../../../data/types/company.ts'
import { useCompanyStore } from '../../../store/companyStore.tsx'
import { useCompanyFilterStore } from '../../../store/filtersStore.tsx'
import {
  fetchCompaniesWithUrlAndPage,
  updateSeenCompany,
} from '../../../utils/api/index.ts'
import { GlobalErrorButton } from '../../common/buttons/GlobalErrorButton.tsx'
import Pagination from '../../common/buttons/Pagination.tsx'
import { StatutIcon } from '../../common/Icons/StatutIcon.tsx'
import { TableSkeleton } from '../../common/Loaders/Skeleton/index.tsx'
import TableCompanyRow from './components/TableCompanyRow.tsx'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../common/Icons/stautIcon.util.ts'

async function fetchCompanies(url: string, page: number) {
  const data = await fetchCompaniesWithUrlAndPage(url, page)

  if (data) {
    const updatedCompanies = updateCompaniesIcon(data.content)
    data.content = updatedCompanies

    return data
  }
}

type Props = {
  url: string
}

export default function TableCompany({ url }: Props) {
  const [dataPagination, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })
  const [companies, setCompanies] = React.useState<Company[]>([])
  const { selectedCompany, setSelectedCompany } = useCompanyStore()

  const { searchParams } = useCompanyFilterStore()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['companies', url, dataPagination.page, searchParams],
    queryFn: () => fetchCompanies(url, dataPagination.page),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (data !== null && data) {
      setDataPagination((prevDataPagination) => ({
        ...prevDataPagination,
        totalPages: data.totalPages,
      }))
      setCompanies(data.content)
    }
  }, [data])

  const handleChangePage = (newPage: number) => {
    setDataPagination((prevDataPagination) => ({
      ...prevDataPagination,
      page: newPage,
    }))
  }

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
  })

  const handleDetailsClick = (company: Company) => {
    if (company !== selectedCompany) {
      setSelectedCompany(company)
      console.log('Company selected: ', selectedCompany)
    }
  }

  if (error !== null && isError) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending) {
    return <TableSkeleton columns={columnsTableCompany} />
  } else if (data !== undefined && data.empty) {
    return (
      <a
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '19px',
          color: '#666',
          height: '100%',
        }}
      >
        Aucune entreprise trouvée
      </a>
    )
  } else if (data !== undefined && !data.empty && Array.isArray(data.content)) {
    return (
      <React.Fragment>
        <Sheet
          aria-label="order-table-container"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflowX: 'auto',
            minHeight: 0,
            overflow: 'auto',
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
              overflow: 'auto',
            }}
          >
            <thead>
              <tr>
                {columnsTableCompany.map((column) => (
                  <th
                    key={column.id}
                    align={column.align}
                    style={{
                      width: column.minWidth,
                      fontSize: 16,
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ wordBreak: 'break-word' }}>
              {companies.map((row, number) => (
                <tr
                  key={row.id + 'rowdetails'}
                  role="checkbox"
                  style={{ cursor: 'pointer' }}
                  tabIndex={-1}
                  onClick={() => handleDetailsClick(row)}
                >
                  <td key={row.id + 'checkbox'} align="center">
                    <IconButton
                      id={`checkbox-${number}`}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        row.checked = handleChangeStatut({
                          company: row,
                          mutation,
                          setCompanies,
                        })
                      }}
                    >
                      <StatutIcon statut={row.checked} />
                    </IconButton>
                  </td>
                  {columnsTableCompany.slice(1).map((column) => (
                    <td key={column.id} align={column.align}>
                      <TableCompanyRow column={column} row={row} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        <Pagination
          dataPagination={dataPagination}
          handleChangePage={handleChangePage}
        />
      </React.Fragment>
    )
  }
}
