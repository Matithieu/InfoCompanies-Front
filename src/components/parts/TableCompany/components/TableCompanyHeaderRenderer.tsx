import { FC } from 'react'

import { Column } from '../../../../data/types/Columns/columns'

type TableCompanyHeadersRendererProps = {
  columns: Column[]
  isCheckboxVisible?: boolean
}

const TableCompanyHeadersRenderer: FC<TableCompanyHeadersRendererProps> = ({
  columns,
  isCheckboxVisible = true,
}) => {
  return (
    <>
      <thead>
        <tr>
          {columns.slice(isCheckboxVisible ? 0 : 1).map((column, index) => (
            <th
              key={column.id}
              align={column.align}
              aria-colindex={index}
              scope="col"
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
    </>
  )
}

export default TableCompanyHeadersRenderer
