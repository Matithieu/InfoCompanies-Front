import './style.css'

import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Page } from '@/types/index.types'
import { Sheet, Table } from '@mui/joy'
import { useState } from 'react'

import { GlobalErrorButton } from '../../common/Buttons/GlobalErrorButton'
import Pagination from '../../common/Buttons/Pagination/Pagination'
import TableCompanyHeadersRenderer from './components/TableCompanyHeaderRenderer/TableCompanyHeaderRenderer'
import TableCompanyRow from './components/TableCompanyRowRenderer/TableCompanyRowRenderer'

type TableCompanyProps<TId, FSubId, TRow> = {
  columns: ColumnsDefinition<TId, FSubId, TRow>
  data: TRow[] | undefined
  isPending: boolean
  error: Error | null
  pagination?: {
    pageNumber: number
    totalPages: number
    handlePageChange: (newPage: Page) => void
  }
  handleRowClick?: (row: TRow) => void
}

const TableCompany = <TId extends string, FSubId extends string, TRow>({
  columns,
  data,
  error,
  isPending,
  handleRowClick,
  pagination,
}: TableCompanyProps<TId, FSubId, TRow>) => {
  const [rowSelected, setRowSelected] = useState<number | undefined>(undefined)

  if (error) return <GlobalErrorButton error={error} />

  return (
    <>
      <Sheet
        aria-label="order-table-container"
        id="joyride-step-1"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 'sm',
          minHeight: 0,
          overflowX: 'auto',
          overflowY: 'auto',
        }}
        variant="outlined"
      >
        <Table
          hoverRow
          stickyHeader
          sx={{
            // use fixed table layout so width styles are enforced
            tableLayout: 'fixed',
            // allow table to grow beyond container and scroll horizontally
            minWidth: 'max-content',
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level2)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          {TableCompanyHeadersRenderer({ columns })}
          <TableCompanyRow
            columns={columns}
            isPending={isPending}
            rows={data}
            rowSelected={rowSelected}
            onRowClick={handleRowClick}
            onRowSelect={setRowSelected}
          />
        </Table>
      </Sheet>
      {pagination && (
        <Pagination
          pageNumber={pagination.pageNumber}
          totalPages={pagination.totalPages}
          onPageChange={pagination.handlePageChange}
        />
      )}
    </>
  )
}

export default TableCompany
