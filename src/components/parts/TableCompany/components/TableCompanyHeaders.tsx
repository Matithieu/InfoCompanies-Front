import { FC } from 'react'

import { Column } from '../../../../data/types/columns'

type TableCompanyHeadersProps = {
  columns: Column[]
}

const TableCompanyHeaders: FC<TableCompanyHeadersProps> = ({ columns }) => {
  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
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
