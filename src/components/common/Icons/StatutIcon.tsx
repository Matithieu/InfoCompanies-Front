import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Tooltip from '@mui/joy/Tooltip'
import { FC } from 'react'

import { CheckStatus } from '../../../data/types/company'

type StatutIconProps = {
  statut: CheckStatus
}

const StatutIcon: FC<StatutIconProps> = ({ statut }) => {
  switch (statut) {
    case CheckStatus.NOT_DONE || '':
      return (
        <Tooltip arrow title="Not Done">
          <RadioButtonUncheckedIcon style={{ color: 'grey' }} />
        </Tooltip>
      )
    case CheckStatus.TO_DO:
      return (
        <Tooltip arrow title="To Do">
          <PendingIcon style={{ color: 'orange' }} />
        </Tooltip>
      )
    case CheckStatus.DONE:
      return (
        <Tooltip arrow title="Done">
          <CheckCircleIcon style={{ color: 'green' }} />
        </Tooltip>
      )
  }
}

export default StatutIcon
