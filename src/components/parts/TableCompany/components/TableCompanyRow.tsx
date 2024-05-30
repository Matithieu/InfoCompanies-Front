import { Column } from '../../../../data/types/columns'
import { Company } from '../../../../data/types/company'

import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

type TableCompanyRowProps = {
  column: Column
  row: Company
}

export default function TableCompanyRow({ column, row }: TableCompanyRowProps) {
  switch (column.id) {
    case 'socialMedia':
      return (
        <>
          {row.socialMedia.facebook && (
            <FacebookIcon style={{ color: '#3b5998' }} />
          )}
          {row.socialMedia.twitter && (
            <TwitterIcon style={{ color: '#1DA1F2' }} />
          )}
          {row.socialMedia.linkedin && (
            <LinkedInIcon style={{ color: '#0e76a8' }} />
          )}
          {row.socialMedia.youtube && <YouTubeIcon style={{ color: 'red' }} />}
        </>
      )
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
          style={{
            maxWidth: '10px',
            maxHeight: '10px',
            overflow: 'hidden',
          }}
          onClick={(e) => {
            if (
              e.target === e.currentTarget &&
              row.website !== null &&
              row.website !== ''
            ) {
              e.stopPropagation() // To avoid triggering handleDetailsClick
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
