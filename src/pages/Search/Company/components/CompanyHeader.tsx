import StatutIcon from '@/components/common/Icons/StatutIcon'
import {
  CheckStatus,
  CompanyDTO,
  CompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { Typography } from '@mui/joy'
import { FC } from 'react'

type CompanyHeaderProps = {
  companyDTOWithStatusDTO: CompanyDtoWithStatusDTO
  handleStatusChange: (company: CompanyDTO, newStatus: CheckStatus) => void
}

const CompanyHeader: FC<CompanyHeaderProps> = ({
  companyDTOWithStatusDTO,
  handleStatusChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Typography level="h2">
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            paddingRight: 10,
          }}
        >
          <StatutIcon
            handleStatusUpdate={(newStatus) =>
              handleStatusChange(companyDTOWithStatusDTO.companyDTO, newStatus)
            }
            statut={companyDTOWithStatusDTO.userCompanyStatus?.status}
            style={{ fontSize: '1.5rem' }}
          />
        </button>
        {companyDTOWithStatusDTO.companyDTO.companyName}
      </Typography>
    </div>
  )
}

export default CompanyHeader
