import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Key } from 'react'

import { countLeafColumns, getMaxDepth } from '../../tableCompany.util'

/**
 * Generates table header rows for a column definition with nested children,
 * ensuring proper colSpan and rowSpan for alignment.
 */
export function renderTableCompanyHeaders<
  TId extends Key,
  FSubId extends Key,
  TRow,
>(columns: ColumnsDefinition<TId, FSubId, TRow>): JSX.Element[] {
  const maxDepth = getMaxDepth(columns)
  const rows: JSX.Element[][] = Array.from({ length: maxDepth }, () => [])

  function traverse(
    columns: ColumnsDefinition<TId | FSubId, FSubId, TRow>,
    depth: number,
  ) {
    for (const column of columns) {
      const hasChildren =
        Array.isArray(column.children) && column.children.length > 0
      const colSpan = hasChildren ? countLeafColumns(column) : 1
      const rowSpan = hasChildren ? 1 : maxDepth - depth + 1

      rows[depth - 1]!.push(
        <th
          key={column.id}
          colSpan={colSpan}
          rowSpan={rowSpan}
          scope="col"
          style={{
            ...column.style,
          }}
        >
          {column.label}
        </th>,
      )

      if (hasChildren) traverse(column.children!, depth + 1)
    }
  }

  traverse(columns, 1)
  return rows.map((rowCells, rowIndex) => <tr key={rowIndex}>{rowCells}</tr>)
}
