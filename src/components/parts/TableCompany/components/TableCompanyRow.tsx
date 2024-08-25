import { FC } from 'react'

import { Column } from '../../../../data/types/columns'
import { Company } from '../../../../data/types/company'
import TableCompanySocial from './TableCompanySocial'

type TableCompanyRowProps = {
  column: Column
  row: Company
}

const TableCompanyRow: FC<TableCompanyRowProps> = ({ column, row }) => {
  switch (column.id) {
    case 'socialMedia':
      return <TableCompanySocial socialMedia={row.socialMedia} />
    case 'dateRegistration':
    case 'industrySector':
    case 'legalForm':
    case 'address':
    case 'postalCode':
    case 'city':
    case 'region':
    case 'companyName':
    case 'phoneNumber':
    case 'email':
      return row[column.id] ?? 'N/A'
    case 'website':
      return (
        <span
          style={{}}
          onClick={(e) => {
            if (
              e.target === e.currentTarget &&
              row.website !== null &&
              row.website !== ''
            ) {
              e.stopPropagation()
              window.open(row.website, '_blank')
            }
          }}
        >
          {row.website ?? 'N/A'}
        </span>
      )
    default:
      return null
  }
}

export default TableCompanyRow
