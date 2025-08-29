import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Key } from 'react'

export function renderTableCompanyCells<
  TId extends Key,
  FSubId extends Key,
  TRow,
>(
  columns: ColumnsDefinition<TId, FSubId, TRow>,
  row: TRow,
  rowIndex: number,
): JSX.Element[] {
  return columns.flatMap((col) => {
    if (col.children) {
      return renderTableCompanyCells(col.children, row, rowIndex)
    }

    return (
      <td key={col.id} style={{ ...col.style }}>
        {col.render ? col.render(row, rowIndex) : null}
      </td>
    )
  })
}
