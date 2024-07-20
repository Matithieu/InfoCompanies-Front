import './style.css'

import { IconButton, Sheet, Table } from '@mui/joy'
import { useMutation } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { columnsTableCompany } from '../../../data/types/columns.ts'
import { Company } from '../../../data/types/company.ts'
import { Page } from '../../../data/types/companyDetails.ts'
import { updateSeenCompany } from '../../../utils/api/index.ts'
import { isNotNU } from '../../../utils/assertion.util.ts'
import { GlobalErrorButton } from '../../common/buttons/GlobalErrorButton.tsx'
import Pagination from '../../common/buttons/Pagination.tsx'
import StatutIcon from '../../common/Icons/StatutIcon.tsx'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../common/Icons/stautIcon.util.ts'
import { TableSkeleton } from '../../common/Loaders/Skeleton/index.tsx'
import TableCompanyHeaders from './components/TableCompanyHeaders.tsx'
import TableCompanyRow from './components/TableCompanyRow.tsx'

type TableCompanyProps = {
  data: Page<Company> | undefined | null
  handleDetailsClick: (company: Company) => void
  handleChangePage: (newPage: number) => void
  isPending: boolean
  error: Error | null
}

const TableCompany: FC<TableCompanyProps> = ({
  data,
  isPending,
  error,
  handleDetailsClick,
  handleChangePage,
}) => {
  const [tableData, setTableData] = useState(data)

  useEffect(() => {
    setTableData(data)
  }, [data])

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
    onSuccess: () => {
      setTableData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            content: updateCompaniesIcon(prevData.content),
          }
        }

        return prevData
      })
    },
  })

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeStatut({
      company,
      mutation,
    })
    setTableData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          content: prevData.content.map((row) =>
            row.id === updatedCompany.id ? updatedCompany : row,
          ),
        }
      }

      return prevData
    })
  }

  if (error) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending) {
    return <TableSkeleton columns={columnsTableCompany} />
  } else if (data && data !== null && data.empty) {
    return (
      <a
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '19px',
        }}
      >
        Aucune entreprise trouvée
      </a>
    )
  } else if (isNotNU(tableData)) {
    return (
      <>
        <Sheet
          aria-label="order-table-container"
          sx={{
            width: '100%',
            borderRadius: 'sm',
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
            <TableCompanyHeaders columns={columnsTableCompany} />
            <tbody style={{ wordBreak: 'break-word' }}>
              {tableData.content.map((row, index) => (
                <tr
                  key={row.id}
                  role="row"
                  style={{ cursor: 'pointer' }}
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDetailsClick(row)
                  }}
                >
                  <td align="center">
                    <IconButton
                      id={`checkbox-${index}`}
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStatusChange(row)
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
          dataPagination={{
            page: tableData.number,
            totalPages: tableData.totalPages,
          }}
          handleChangePage={handleChangePage}
        />
      </>
    )
  }
}

export default TableCompany
