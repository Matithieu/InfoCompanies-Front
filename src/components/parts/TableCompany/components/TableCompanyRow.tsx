import { IconButton } from '@mui/joy'
import { FC, Fragment } from 'react'

import { Column } from '../../../../data/types/columns'
import { Company } from '../../../../data/types/company'
import StatutIcon from '../../../common/Icons/StatutIcon'
import TableCompanyRowCell from './TableCompanyRowCell'

type TableCompanyRowProps = {
  companies: Company[]
  columns: Column[]
  rowSelected: number | null
  isCheckboxVisible: boolean
  handleDetailsClick: (company: Company) => void
  handleStatusChange: (company: Company) => void
  setRowSelected: (id: number) => void
}

const TableCompanyRow: FC<TableCompanyRowProps> = ({
  companies,
  columns,
  rowSelected,
  isCheckboxVisible,
  handleDetailsClick,
  handleStatusChange,
  setRowSelected,
}) => {
  return (
    <Fragment>
      {companies.map((row, index) => (
        <tr
          key={row.id}
          className={`fade-in table-row ${index % 2 === 0 ? 'even' : 'odd'} ${
            rowSelected === row.id ? 'selected-row' : ''
          }`}
          role="row"
          style={{
            cursor: 'pointer',
            backgroundColor:
              rowSelected === row.id
                ? 'var(--joy-palette-background-level2)'
                : undefined,
          }}
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            handleDetailsClick(row)
            setRowSelected(row.id)
          }}
        >
          {isCheckboxVisible && (
            <td align="center">
              <IconButton
                id={`checkbox-${index}`}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '22px',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatusChange(row)
                }}
              >
                <StatutIcon statut={row.checked} />
              </IconButton>
            </td>
          )}
          {columns.slice(1).map((column) => (
            <td
              key={column.id}
              align={column.align}
              style={{
                maxWidth: '20px',
                maxHeight: '1.5em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <TableCompanyRowCell column={column} row={row} />
            </td>
          ))}
        </tr>
      ))}
    </Fragment>
  )
}

export default TableCompanyRow
