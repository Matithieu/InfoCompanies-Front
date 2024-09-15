import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'

import { CheckStatus } from '../../../data/types/company'
import useCompaniesSeenStore from '../../../store/companySeenStore'
import { updateSeenCompany } from '../../../utils/api'

type StatutIconProps = {
  companyId: number
  statut: CheckStatus
  style?: React.CSSProperties
}

const StatutIcon: FC<StatutIconProps> = ({ companyId, statut, style }) => {
  const { companiesSeen, setCompaniesSeen } = useCompaniesSeenStore()

  const mutation = useMutation({
    mutationFn: (status: CheckStatus) => updateSeenCompany(companyId, status),
    onError: (error) => {
      throw new Error(`Error updating recommendations: ${error.message}`)
    },
  })

  const handleStatusUpdate = (newStatus: CheckStatus) => {
    mutation.mutate(newStatus)

    const companyExists = companiesSeen?.some(
      (company) => company.companyId === companyId,
    )

    if (companyExists && companiesSeen) {
      setCompaniesSeen(
        companiesSeen.map((company) =>
          company.companyId === companyId
            ? { ...company, status: newStatus }
            : company,
        ),
      )
    } else if (companiesSeen) {
      // If the company does not exist, add it to the list
      setCompaniesSeen([
        ...companiesSeen,
        { companyId, status: newStatus, userId: 1 },
      ])
    }
  }

  const getIcon = () => {
    switch (statut) {
      default:
      case CheckStatus.NOT_DONE:
        return (
          <RadioButtonUncheckedIcon
            style={{ color: 'grey', ...style }}
            onClick={() => handleStatusUpdate(CheckStatus.TO_DO)}
          />
        )
      case CheckStatus.TO_DO:
        return (
          <PendingIcon
            style={{ color: 'orange', ...style }}
            onClick={() => handleStatusUpdate(CheckStatus.DONE)}
          />
        )
      case CheckStatus.DONE:
        return (
          <CheckCircleIcon
            style={{ color: 'green', ...style }}
            onClick={() => handleStatusUpdate(CheckStatus.NOT_DONE)}
          />
        )
    }
  }

  return getIcon()
}

export default StatutIcon
