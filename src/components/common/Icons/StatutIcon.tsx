import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Tooltip from '@mui/joy/Tooltip'

import { CheckStatus } from '../../../data/types/company'

interface StatutIconProps {
  statut: CheckStatus
}

export const StatutIcon = ({ statut }: StatutIconProps) => {
  switch (statut) {
    case CheckStatus.NOT_DONE || '':
      return (
        <Tooltip key="NotDoneTooltip" arrow title="Not Done">
          <RadioButtonUncheckedIcon style={{ color: 'grey' }} />
        </Tooltip>
      )
    case CheckStatus.DONE:
      return (
        <Tooltip key="DoneTooltip" arrow title="Done">
          <CheckCircleIcon style={{ color: 'green' }} />
        </Tooltip>
      )
    case CheckStatus.TO_DO:
      return (
        <Tooltip key="ToDoTooltip" arrow title="To Do">
          <PendingIcon style={{ color: 'orange' }} />
        </Tooltip>
      )
  }
}
