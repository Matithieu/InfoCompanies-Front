import { FC } from 'react'

import { Column } from '../../../../data/types/columns'

type TableCompanyHeadersProps = {
  columns: Column[]
  isCheckboxVisible?: boolean
}

const TableCompanyHeaders: FC<TableCompanyHeadersProps> = ({
  columns,
  isCheckboxVisible = true,
}) => {
  return (
    <>
      <thead>
        <tr>
          {columns.slice(isCheckboxVisible ? 0 : 1).map((column) => (
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
    </>
  )
}

export default TableCompanyHeaders
