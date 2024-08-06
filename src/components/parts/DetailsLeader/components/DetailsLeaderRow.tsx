import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/joy'
import { FC } from 'react'

import { Leader } from '../../../../data/types/leader'

type DetailsLeaderRowProps = {
  leader: Leader
}

const DetailsLeaderRow: FC<DetailsLeaderRowProps> = ({ leader }) => {
  return (
    <tr
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
        fontSize: '16px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <PersonIcon />
        <Typography>
          {leader.firstName} {leader.lastName}
        </Typography>
      </div>
      <div>
        <Typography textColor="#808080">{leader.role}</Typography>
      </div>
    </tr>
  )
}

export default DetailsLeaderRow
