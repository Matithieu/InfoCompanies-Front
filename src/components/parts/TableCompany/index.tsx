import './style.css'

import { IconButton, Sheet, Table } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useEffect } from 'react'

import { columnsTableCompany } from '../../../data/types/columns.ts'
import { CheckStatus, Company } from '../../../data/types/company.ts'
import { useCompanyStore } from '../../../store/companyStore.tsx'
import { useCompanyFilterStore } from '../../../store/filtersStore.tsx'
import { fetchCompaniesWithUrlAndPage } from '../../../utils/api/index.ts'
import { parseJsonToCompany } from '../../../utils/parseJsonToObject.ts'
import { GlobalErrorButton } from '../../common/buttons/GlobalErrorButton.tsx'
import Pagination from '../../common/buttons/Pagination.tsx'
import { manageIsChecked, StatutIcon } from '../../common/Icons/StatutIcon.tsx'
import { TableSkeleton } from '../../common/Loaders/Skeleton/index.tsx'
import TableCompanyRow from './components/TableCompanyRow.tsx'

// https://www.material-react-table.com/
// agGrid
// Using this ?

// TODO: Replace this with the data from the API
/*
const leader1 = new Leader(1, "JEAN", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 1, denomination: "Entreprise 1" }])
const leader2 = new Leader(2, "JOSEPHE", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 2, denomination: "Entreprise 1" }])
const leader3 = new Leader(3, "HENRI", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 4, denomination: "Entreprise 4" }])
const leader4 = new Leader(4, "EUDES", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 5, denomination: "Entreprise 5" }])
const leader5 = new Leader(5, "HERCUL", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 6, denomination: "Entreprise 6" }])
*/

async function fetchCompanies(url: string, page: number) {
  const data = await fetchCompaniesWithUrlAndPage(url, page)

  if (data) {
    const companies: Company[] = data.content
      .map((companyObj) => parseJsonToCompany(companyObj))
      .filter(Boolean) as Company[]

    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]')
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]')

    const updatedCompanyData = companies.map((company) => {
      if (checkedDone.includes(company.id)) {
        company.checked = CheckStatus.DONE
      } else if (checkedToDo.includes(company.id)) {
        company.checked = CheckStatus.TO_DO
      } else {
        company.checked = CheckStatus.NOT_DONE
      }

      return company
    })

    data.content = updatedCompanyData

    return data
  }
}

type Props = {
  url: string
}

/**
 *
 * @param param0 Takes a callback function as a parameter and displays a table of companies
 * @returns A table of companies with their details
 */
export default function TableCompany({ url }: Props) {
  const [dataPagniation, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  })
  const [companies, setCompanies] = React.useState<Company[]>([])
  const { selectedCompany, setSelectedCompany } = useCompanyStore()

  const { searchParams } = useCompanyFilterStore()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['companies', url, dataPagniation.page, searchParams],
    queryFn: () => fetchCompanies(url, dataPagniation.page),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setDataPagination((prevDataPagination) => ({
  //     ...prevDataPagination,
  //     rowsPerPage: +event.target.value,
  //     page: 0,
  //   }));
  // };

  const handleDetailsClick = (company: Company) => {
    if (company !== selectedCompany) {
      setSelectedCompany(company)
      console.log('Company selected: ', selectedCompany)
    }
  }

  // TODO : Another function is in the file src/pages/Company/index.tsx
  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckStatus

    if (company.checked === CheckStatus.NOT_DONE) {
      newStatus = CheckStatus.TO_DO
    } else if (company.checked === CheckStatus.TO_DO) {
      newStatus = CheckStatus.DONE
    } else {
      newStatus = CheckStatus.NOT_DONE
    }

    company.checked = newStatus
    manageIsChecked(company.id, newStatus)

    // Change the status of the company in data
    setCompanies((prevCompanies) =>
      prevCompanies.map((item) => (item.id === company.id ? company : item)),
    )
    return newStatus
  }

  if (error !== null && isError) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GlobalErrorButton error={error} />
      </div>
    )
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
                        row.checked = handleChangeStatut(row)
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
          dataPagniation={dataPagniation}
          handleChangePage={handleChangePage}
        />
      </React.Fragment>
    )
  }
}
