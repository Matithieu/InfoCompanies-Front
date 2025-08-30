import LinkIcon from '@/components/common/Icons/LinkIcon'
import StatutIcon from '@/components/common/Icons/StatutIcon'
import { statusEnumToString } from '@/components/common/Icons/statutIcon.util'
import CellContent from '@/components/parts/TableCompany/components/content/CellContent'
import CellContentTooltip from '@/components/parts/TableCompany/components/content/CellContentTooltip'
import columnsMessages from '@/types/columns/columns.messages'
import { CheckStatus, CompanyDTO } from '@/types/index.types'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Tooltip } from '@mui/joy'

import { formatMessage } from '../../../services/intl/intl'
import { DashboardColumnGenerics } from '../dashboard.types'

type UseDashboardColumnsDefParams = {
  handleCopyToClipboard: (content: string | undefined) => void
  handleOpenInNewTab: (content: string) => void
  handleStatusChange: (company: CompanyDTO, newStatus: CheckStatus) => void
}

export function useDashboardColumnsDef({
  handleCopyToClipboard,
  handleOpenInNewTab,
  handleStatusChange,
}: UseDashboardColumnsDefParams): DashboardColumnGenerics['TColumns'] {
  return [
    {
      id: 'checked',
      label: '',
      style: { width: 50 },
      render: (companiesDtoWithStatusDTORow, index) => {
        const { companyDTO, userCompanyStatus } = companiesDtoWithStatusDTORow
        return (
          <Tooltip
            arrow
            placement="left"
            title={statusEnumToString(userCompanyStatus?.status)}
          >
            <button
              id={index === 1 ? 'joyride-step-4' : ''}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <StatutIcon
                handleStatusUpdate={(newStatus) =>
                  handleStatusChange(companyDTO, newStatus)
                }
                statut={userCompanyStatus?.status}
                style={{ fontSize: '20px' }}
              />
            </button>
          </Tooltip>
        )
      },
    },
    {
      id: 'companyName',
      label: formatMessage(columnsMessages.companyName),
      style: { width: 170 },
      render: ({ companyDTO }) => (
        <CellContentTooltip
          content={companyDTO.companyName}
          onContentClick={() => {
            const url = `${companyDTO.companyName} ${companyDTO.city}`
            handleOpenInNewTab(url)
          }}
        />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      style: { width: 400 },
      children: [
        {
          id: 'email',
          label: formatMessage(columnsMessages.email),
          render: ({ companyDTO }) => (
            <CellContentTooltip
              isCopyEnabled
              content={companyDTO.contact?.email}
              onContentClick={handleCopyToClipboard}
            />
          ),
        },
        {
          id: 'phoneNumber',
          label: formatMessage(columnsMessages.phoneNumber),
          render: ({ companyDTO }) => (
            <CellContentTooltip
              isCopyEnabled
              content={companyDTO.contact?.phoneNumber}
              onContentClick={() =>
                handleCopyToClipboard(companyDTO.contact?.phoneNumber)
              }
            />
          ),
        },
        {
          id: 'website',
          label: formatMessage(columnsMessages.website),
          render: ({ companyDTO }) => (
            <CellContentTooltip
              content={companyDTO.contact?.website}
              onContentClick={() =>
                companyDTO.contact?.website &&
                window.open(companyDTO.contact.website, '_blank')
              }
            />
          ),
        },
      ],
    },
    {
      id: 'socialMedia',
      label: formatMessage(columnsMessages.socialMedia),
      style: { width: 'auto' },
      children: [
        {
          id: 'facebook',
          label: 'Facebook',
          render: ({ companyDTO }) => (
            <LinkIcon
              icon={<FacebookIcon fontSize="medium" />}
              style={{ color: '#3b5998' }}
              url={companyDTO.socialMedia?.facebook}
            />
          ),
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          render: ({ companyDTO }) => (
            <LinkIcon
              icon={<LinkedInIcon fontSize="medium" />}
              style={{ color: '#0e76a8' }}
              url={companyDTO.socialMedia?.linkedin}
            />
          ),
        },
        {
          id: 'instagram',
          label: 'Instagram',
          render: ({ companyDTO }) => (
            <LinkIcon
              icon={<InstagramIcon fontSize="medium" />}
              style={{ color: '#E4405F' }}
              url={companyDTO.socialMedia?.instagram}
            />
          ),
        },
        {
          id: 'twitter',
          label: 'Twitter',
          render: ({ companyDTO }) => (
            <LinkIcon
              icon={<TwitterIcon fontSize="medium" />}
              style={{ color: '#1DA1F2' }}
              url={companyDTO.socialMedia?.twitter}
            />
          ),
        },
        {
          id: 'youtube',
          label: 'YouTube',
          render: ({ companyDTO }) => (
            <LinkIcon
              icon={<YouTubeIcon fontSize="medium" />}
              style={{ color: 'red' }}
              url={companyDTO.socialMedia?.youtube}
            />
          ),
        },
      ],
    },
    {
      id: 'numberOfEmployee',
      label: formatMessage(columnsMessages.numberOfEmployee),
      style: { width: 100 },
      render: ({ companyDTO }) => (
        <CellContent content={companyDTO.numberOfEmployee} />
      ),
    },
    {
      id: 'city',
      label: formatMessage(columnsMessages.city),
      style: { width: 170 },
      render: ({ companyDTO }) => <CellContent content={companyDTO.city} />,
    },
    {
      id: 'registrationDate',
      label: formatMessage(columnsMessages.registrationDate),
      style: { width: 170 },
      render: ({ companyDTO }) => (
        <CellContent content={companyDTO.registrationDate} />
      ),
    },
    {
      id: 'industrySector',
      label: formatMessage(columnsMessages.industrySector),
      style: { width: 170 },
      render: ({ companyDTO }) => (
        <CellContent content={companyDTO.industrySector} />
      ),
    },
    {
      id: 'legalForm',
      label: formatMessage(columnsMessages.legalForm),
      style: { width: 170 },
      render: ({ companyDTO }) => (
        <CellContent content={companyDTO.legalForm} />
      ),
    },
    {
      id: 'address',
      label: formatMessage(columnsMessages.address),
      style: { width: 170 },
      render: ({ companyDTO }) => <CellContent content={companyDTO.address} />,
    },
    {
      id: 'region',
      label: formatMessage(columnsMessages.region),
      style: { width: 170 },
      render: ({ companyDTO }) => <CellContent content={companyDTO.region} />,
    },
  ]
}
