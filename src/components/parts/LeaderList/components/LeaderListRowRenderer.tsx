import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/joy'
import { FC } from 'react'

import { Leader } from '../../../../data/types/index.types'

type LeaderListRowRendererProps = {
  leader: Leader
}

const LeaderListRowRenderer: FC<LeaderListRowRendererProps> = ({ leader }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PersonIcon />

        <Typography style={{ marginLeft: 8 }}>
          {leader.firstName} {leader.lastName}
        </Typography>
      </div>
      <Typography textColor="#808080">{leader.role}</Typography>
    </div>
  )
}

export default LeaderListRowRenderer
