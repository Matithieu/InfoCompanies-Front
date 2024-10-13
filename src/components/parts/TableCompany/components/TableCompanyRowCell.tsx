import { Tooltip } from '@mui/joy'
import { FC } from 'react'
import { toast } from 'react-toastify'

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
    toast.done('E-mail copied to clipboard!')
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
          return <span style={{ color: '#808080' }}>N/A</span>
        }

        return (
          <Tooltip title="Click to copy">
            <span
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: row.email ? 'inherit' : '#808080',
              }}
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

      return (
        <span style={{ color: row[column.id] ? 'inherit' : '#808080' }}>
          {row[column.id] ?? 'N/A'}
        </span>
      )
    case 'website':
      return (
        <span
          style={{
            cursor: row.website ? 'pointer' : 'default',
            color: row.website ? 'inherit' : '#808080',
          }}
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
