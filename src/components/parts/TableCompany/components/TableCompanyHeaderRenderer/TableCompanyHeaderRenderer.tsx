import { ColumnsDefinition } from '@/types/columns/columns.type'
import { Key } from 'react'

import { renderTableCompanyHeaders } from './tableCompanyHeaderRenderer.util'

type TableCompanyHeadersRendererProps<
  TId extends Key,
  FSubId extends Key,
  TRow,
> = {
  columns: ColumnsDefinition<TId, FSubId, TRow>
}

const TableCompanyHeadersRenderer = <
  TId extends Key,
  FSubId extends Key,
  TRow,
>({
  columns,
}: TableCompanyHeadersRendererProps<TId, FSubId, TRow>) => {
  return (
    <>
      <thead>{renderTableCompanyHeaders(columns)}</thead>
    </>
  )
}

export default TableCompanyHeadersRenderer
