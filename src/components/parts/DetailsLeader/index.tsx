import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/joy'
import { FC } from 'react'

import { Leader } from '../../../data/types/leader'

type DetailsLeaderProps = {
  leader: Leader
}

const DetailsLeader: FC<DetailsLeaderProps> = ({ leader }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #e0e0e0',
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

export default DetailsLeader
