import { Tooltip } from '@mui/joy'
import { FC, Fragment } from 'react'

import { Column } from '../../../../data/types/Columns/columns'
import { Company } from '../../../../data/types/company'
import StatutIcon from '../../../common/Icons/StatutIcon'
import { getStatutEnumPretty } from '../../../common/Icons/stautIcon.util'
import TableCompanyCellRenderer from './TableCompanyCellRenderer'

type TableCompanyRowRendererProps = {
  companies: Company[]
  columns: Column[]
  rowSelected: number | undefined
  isCheckboxVisible: boolean
  onCompanyDetailsClick: (company: Company) => void
  onStatusUpdate: (company: Company) => void
  onRowSelect: (id: number) => void
}

const TableCompanyRowRenderer: FC<TableCompanyRowRendererProps> = ({
  companies,
  columns,
  rowSelected,
  isCheckboxVisible,
  onCompanyDetailsClick,
  onStatusUpdate,
  onRowSelect,
}) => {
  return (
    <Fragment>
      {companies.map((companyRow, index) => (
        <tr
          key={companyRow.id}
          className={`table-row fade-in ${index % 2 === 0 ? 'even' : 'odd'} ${
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
            onCompanyDetailsClick(companyRow)
            onRowSelect(companyRow.id)
          }}
        >
          {isCheckboxVisible && (
            <td align="center">
              <Tooltip
                arrow
                placement="left"
                title={getStatutEnumPretty(companyRow.userCompanyStatus.status)}
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
                    onStatusUpdate(companyRow)
                  }}
                >
                  <StatutIcon
                    companyId={companyRow.id}
                    statut={companyRow.userCompanyStatus.status}
                    style={{ fontSize: '20px' }}
                  />
                </button>
              </Tooltip>
            </td>
          )}
          {columns.slice(1).map((column, index) => (
            <td
              key={column.id}
              align={column.align}
              aria-colindex={index + 1}
              style={{
                maxWidth: '20px',
                maxHeight: '1.5em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <TableCompanyCellRenderer column={column} row={companyRow} />
            </td>
          ))}
        </tr>
      ))}
    </Fragment>
  )
}

export default TableCompanyRowRenderer
