import LinkIcon from '@/components/common/Icons/LinkIcon'
import CellContent from '@/components/parts/TableCompany/components/content/CellContent'
import CellContentTooltip from '@/components/parts/TableCompany/components/content/CellContentTooltip'
import { formatMessage } from '@/services/intl/intl'
import columnsMessages from '@/types/columns/columns.messages'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

import { LandingColumnGenerics } from '../landing.types'

type UseLandingColumnsDefParams = {
  handleCopyToClipboard: (content: string | undefined) => void
  handleOpenInNewTab: (content: string) => void
}

export function useLandingColumnsDef({
  handleCopyToClipboard,
  handleOpenInNewTab,
}: UseLandingColumnsDefParams): LandingColumnGenerics['TColumns'] {
  return [
    {
      id: 'companyName',
      label: formatMessage(columnsMessages.companyName),
      style: { width: 200 },
      render: (company) => (
        <CellContentTooltip
          content={company.companyName}
          onContentClick={() => {
            const url = `${company.companyName} ${company.city}`
            handleOpenInNewTab(url)
          }}
        />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      style: { width: 200 },
      children: [
        {
          id: 'email',
          label: formatMessage(columnsMessages.email),
          style: { width: 140 },
          render: (company) => (
            <CellContentTooltip
              isCopyEnabled
              content={company.contact?.email}
              onContentClick={handleCopyToClipboard}
            />
          ),
        },
        {
          id: 'phoneNumber',
          label: formatMessage(columnsMessages.phoneNumber),
          style: { width: 140 },
          render: (company) => (
            <CellContentTooltip
              isCopyEnabled
              content={company.contact?.phoneNumber}
              onContentClick={() =>
                handleCopyToClipboard(company.contact?.phoneNumber)
              }
            />
          ),
        },
        {
          id: 'website',
          label: formatMessage(columnsMessages.website),
          style: { width: 200 },
          render: (company) => (
            <CellContentTooltip
              content={company.contact?.website}
              onContentClick={() =>
                company.contact?.website &&
                window.open(company.contact.website, '_blank')
              }
            />
          ),
        },
      ],
    },
    {
      id: 'socialMedia',
      label: formatMessage(columnsMessages.socialMedia),
      children: [
        {
          id: 'facebook',
          label: 'Facebook',
          style: { width: 100 },
          render: (company) => (
            <LinkIcon
              icon={<FacebookIcon fontSize="medium" />}
              style={{ color: '#3b5998' }}
              url={company.socialMedia?.facebook}
            />
          ),
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          style: { width: 100 },
          render: (company) => (
            <LinkIcon
              icon={<LinkedInIcon fontSize="medium" />}
              style={{ color: '#0e76a8' }}
              url={company.socialMedia?.linkedin}
            />
          ),
        },
        {
          id: 'instagram',
          label: 'Instagram',
          style: { width: 100 },
          render: (company) => (
            <LinkIcon
              icon={<InstagramIcon fontSize="medium" />}
              style={{ color: '#E4405F' }}
              url={company.socialMedia?.instagram}
            />
          ),
        },
        {
          id: 'twitter',
          label: 'Twitter',
          style: { width: 100 },
          render: (company) => (
            <LinkIcon
              icon={<TwitterIcon fontSize="medium" />}
              style={{ color: '#1DA1F2' }}
              url={company.socialMedia?.twitter}
            />
          ),
        },
        {
          id: 'youtube',
          label: 'YouTube',
          style: { width: 100 },
          render: (company) => (
            <LinkIcon
              icon={<YouTubeIcon fontSize="medium" />}
              style={{ color: 'red' }}
              url={company.socialMedia?.youtube}
            />
          ),
        },
      ],
    },
    {
      id: 'numberOfEmployee',
      label: formatMessage(columnsMessages.numberOfEmployee),
      style: { width: 100 },
      render: (company) => <CellContent content={company.numberOfEmployee} />,
    },
    {
      id: 'city',
      label: formatMessage(columnsMessages.city),
      style: { width: 200 },
      render: (company) => <CellContent content={company.city} />,
    },
    {
      id: 'registrationDate',
      label: formatMessage(columnsMessages.registrationDate),
      style: { width: 200 },
      render: (company) => <CellContent content={company.registrationDate} />,
    },
    {
      id: 'industrySector',
      label: formatMessage(columnsMessages.industrySector),
      style: { width: 200 },
      render: (company) => <CellContent content={company.industrySector} />,
    },
    {
      id: 'legalForm',
      label: formatMessage(columnsMessages.legalForm),
      style: { width: 200 },
      render: (company) => <CellContent content={company.legalForm} />,
    },
    {
      id: 'address',
      label: formatMessage(columnsMessages.address),
      style: { width: 200 },
      render: (company) => <CellContent content={company.address} />,
    },
    {
      id: 'region',
      label: formatMessage(columnsMessages.region),
      style: { width: 200 },
      render: (company) => <CellContent content={company.region} />,
    },
  ]
}
