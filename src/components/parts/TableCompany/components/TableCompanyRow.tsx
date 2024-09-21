import { Tooltip } from '@mui/joy'
import { FC, Fragment } from 'react'

import { Column } from '../../../../data/types/columns'
import { Company } from '../../../../data/types/company'
import StatutIcon from '../../../common/Icons/StatutIcon'
import { getStatutEnumPretty } from '../../../common/Icons/stautIcon.util'
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
      {companies.map((companyRow, index) => (
        <tr
          key={companyRow.id}
          className={`fade-in table-row ${index % 2 === 0 ? 'even' : 'odd'} ${
            rowSelected === companyRow.id ? 'selected-row' : ''
          }`}
          role="row"
          style={{
            cursor: 'pointer',
            backgroundColor:
              rowSelected === companyRow.id
                ? 'var(--joy-palette-background-level2)'
                : undefined,
          }}
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            handleDetailsClick(companyRow)
            setRowSelected(companyRow.id)
          }}
        >
          {isCheckboxVisible && (
            <td align="center">
              <Tooltip
                arrow
                placement="left"
                title={getStatutEnumPretty(companyRow.checked)}
              >
                <button
                  id={index === 1 ? 'joyride-step-4' : ''}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatusChange(companyRow)
                  }}
                >
                  <StatutIcon
                    companyId={companyRow.id}
                    statut={companyRow.checked}
                    style={{ fontSize: '20px' }}
                  />
                </button>
              </Tooltip>
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
              <TableCompanyRowCell column={column} row={companyRow} />
            </td>
          ))}
        </tr>
      ))}
    </Fragment>
  )
}

export default TableCompanyRow
