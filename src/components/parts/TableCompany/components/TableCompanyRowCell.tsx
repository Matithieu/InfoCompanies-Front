import { Tooltip } from '@mui/joy'
import { FC } from 'react'

import { Column } from '../../../../data/types/columns'
import { Company } from '../../../../data/types/company'
import TableCompanySocial from './TableCompanySocial'

type TableCompanyRowCellProps = {
  column: Column
  row: Company
}

const TableCompanyRowCell: FC<TableCompanyRowCellProps> = ({ column, row }) => {
  const handleEmailClick = (email: string) => {
    navigator.clipboard.writeText(email)
    alert('Email copied to clipboard!')
  }

  switch (column.id) {
    case 'socialMedia':
      return <TableCompanySocial socialMedia={row.socialMedia} />
    case 'dateRegistration':
    case 'industrySector':
    case 'legalForm':
    case 'address':
    case 'numberOfEmployee':
    case 'city':
    case 'region':
    case 'companyName':
    case 'phoneNumber':
    case 'email':
      if (column.id === 'email') {
        if (row.email === null || row.email === '') {
          return 'N/A'
        }

        return (
          <Tooltip title="Click to copy">
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              title="Click to copy"
              onClick={(e) => {
                e.stopPropagation()
                handleEmailClick(row.email)
              }}
            >
              {row.email ?? 'N/A'}
            </span>
          </Tooltip>
        )
      }

      return row[column.id] ?? 'N/A'
    case 'website':
      return (
        <span
          style={{ cursor: row.website ? 'pointer' : 'default' }}
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

export default TableCompanyRowCell
