import SkeletonRows from '@/components/common/Skeleton/Skeleton'
import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Key } from 'react'

import { countLeafColumns } from '../../tableCompany.util'
import NoCompaniesFound from '../content/NoCompaniesFound'
import TableCompanyCellRenderer from '../TableCompanyCellRenderer/TableCompanyCellRenderer'

type TableCompanyRowRendererProps<TId, FSubId, TRow> = {
  columns: ColumnsDefinition<TId, FSubId, TRow> | undefined
  rows: TRow[] | undefined
  rowSelected: number | undefined
  isPending: boolean
  onRowClick?: (row: TRow) => void
  onRowSelect?: (id: number) => void
}

const TableCompanyRow = <TId extends Key, FSubId extends Key, TRow>({
  columns,
  isPending,
  rowSelected,
  rows,
  onRowClick,
  onRowSelect,
}: TableCompanyRowRendererProps<TId, FSubId, TRow>) => {
  const totalOfColumns = columns
    ? columns.reduce((count, column) => count + countLeafColumns(column), 0)
    : 0

  return (
    <tbody id="#joyride-step-1">
      {isPending && <SkeletonRows numberOfColumns={totalOfColumns} />}
      {rows?.length === 0 && !isPending && (
        <tr style={{ maxHeight: '52px' }}>
          <td>
            <NoCompaniesFound />
          </td>
        </tr>
      )}
      {rows && columns && (
        <>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`table-row fade-in ${rowIndex % 2 === 0 ? 'even' : 'odd'} ${
                rowSelected === rowIndex && 'selected-row'
              }`}
              role="row"
              style={{
                cursor: 'pointer',
                ...(rowSelected === rowIndex && {
                  backgroundColor: 'var(--joy-palette-background-level2)',
                }),
                maxHeight: '52px',
              }}
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                if (onRowClick) onRowClick(row)
                if (onRowSelect) onRowSelect(rowIndex)
              }}
            >
              {TableCompanyCellRenderer({
                columns,
                row,
                rowIndex,
              })}
            </tr>
          ))}
        </>
      )}
    </tbody>
  )
}

export default TableCompanyRow
