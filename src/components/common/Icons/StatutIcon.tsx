import { CheckStatus } from '@/types/index.types'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { FC } from 'react'

type StatutIconProps = {
  statut: CheckStatus | undefined
  style?: React.CSSProperties
  handleStatusUpdate: (newStatus: CheckStatus) => void
}

const StatutIcon: FC<StatutIconProps> = ({
  statut,
  style,
  handleStatusUpdate,
}) => {
  switch (statut) {
    default:
    case 'NOT_DONE':
      return (
        <RadioButtonUncheckedIcon
          style={{ color: 'grey', ...style }}
          onClick={() => handleStatusUpdate('TO_DO')}
        />
      )
    case 'TO_DO':
      return (
        <PendingIcon
          style={{ color: 'orange', ...style }}
          onClick={() => handleStatusUpdate('DONE')}
        />
      )
    case 'DONE':
      return (
        <CheckCircleIcon
          style={{ color: 'green', ...style }}
          onClick={() => handleStatusUpdate('NOT_DONE')}
        />
      )
  }
}

export default StatutIcon
