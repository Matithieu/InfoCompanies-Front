import { FC } from 'react'
import { toast } from 'react-toastify'

import { Column } from '../../../../data/types/Columns/columns'
import { Company } from '../../../../data/types/company'
import { formatMessage } from '../../../../services/intl/intl'
import { asserts } from '../../../../utils/assertion.util'
import tableCompanyMessages from '../tableCompany.messages'
import CellContent from './content/CellContent'
import CellContentTooltip from './content/CellContentTooltip'
import TableCompanySocial from './TableCompanySocial'

type TableCompanyRowCellProps = {
  column: Column
  row: Company
}

const TableCompanyRowCell: FC<TableCompanyRowCellProps> = ({ column, row }) => {
  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success(formatMessage(tableCompanyMessages.copyToClipboard))
  }

  const handleOpenInNewTab = (content: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(content)}`
    window.open(url, '_blank')
  }

  switch (column.id) {
    case 'socialMedia':
      return <TableCompanySocial socialMedia={row.socialMedia} />
    case 'email':
      return (
        <CellContentTooltip
          isCopyEnabled
          content={row.email}
          onContentClick={handleCopyToClipboard}
        />
      )
    case 'website':
      return (
        <CellContentTooltip
          content={row.website}
          onContentClick={() => open(row.website)}
        />
      )
    case 'phoneNumber':
      return (
        <CellContentTooltip
          isCopyEnabled
          content={row.phoneNumber}
          onContentClick={() => handleCopyToClipboard(row.phoneNumber)}
        />
      )
    case 'companyName':
      return (
        <CellContentTooltip
          content={row.companyName}
          onContentClick={() => {
            const url = `${row.companyName} ${row.city}`
            handleOpenInNewTab(url)
          }}
        />
      )
    case 'dateRegistration':
      return <CellContent content={row.dateRegistration} />
    case 'industrySector':
      return <CellContent content={row.industrySector} />
    case 'legalForm':
      return <CellContent content={row.legalForm} />
    case 'address':
      return <CellContent content={row.address} />
    case 'numberOfEmployee':
      return <CellContent content={row.numberOfEmployee?.toString()} />
    case 'city':
      return <CellContent content={row.city} />
    case 'region':
      return <CellContent content={row.region} />

    default:
      asserts(false, 'Column not found: ' + column.id)
  }
}

export default TableCompanyRowCell
