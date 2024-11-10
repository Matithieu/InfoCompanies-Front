import StatutIcon from '@/components/common/Icons/StatutIcon'
import { handleChangeCompanyStatut } from '@/components/common/Icons/stautIcon.util'
import { Company } from '@/data/types/company'
import { Typography } from '@mui/joy'
import { FC } from 'react'

type CompanyHeaderProps = {
  company: Company
  setCompany: React.Dispatch<React.SetStateAction<Company | undefined>>
}

const CompanyHeader: FC<CompanyHeaderProps> = ({ company, setCompany }) => {
  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeCompanyStatut({ company })

    setCompany((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          updatedCompany,
        }
      }

      return prevData
    })
  }

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
          onClick={() => {
            handleStatusChange(company)
          }}
        >
          <StatutIcon
            companyId={company.id}
            statut={company.userCompanyStatus.status}
            style={{ fontSize: '1.5rem' }}
          />
        </button>
        {company.companyName}
      </Typography>
    </div>
  )
}

export default CompanyHeader
