import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'

import { CheckStatus } from '../../../data/types/company'
import { updateSeenCompany } from '../../../utils/api/mutations'

type StatutIconProps = {
  companyId: number
  statut: CheckStatus
  style?: React.CSSProperties
}

const StatutIcon: FC<StatutIconProps> = ({ companyId, statut, style }) => {
  const mutation = useMutation({
    mutationFn: (status: CheckStatus) => updateSeenCompany(companyId, status),
    onError: (error) => {
      throw new Error(`Error updating recommendations: ${error.message}`)
    },
  })

  const handleStatusUpdate = (newStatus: CheckStatus) => {
    mutation.mutate(newStatus)
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
