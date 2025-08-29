import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Key } from 'react'

import { renderTableCompanyCells } from './tableCompanyCellRenderer.util'

type TableCompanyCellRendererProps<
  TId extends Key,
  FSubId extends Key,
  TRow,
> = {
  columns: ColumnsDefinition<TId, FSubId, TRow>
  row: TRow
  rowIndex: number
}

const TableCompanyCellRenderer = <TId extends Key, FSubId extends Key, TRow>({
  columns,
  row,
  rowIndex,
}: TableCompanyCellRendererProps<TId, FSubId, TRow>) => {
  return <>{renderTableCompanyCells(columns, row, rowIndex)}</>
}

export default TableCompanyCellRenderer
