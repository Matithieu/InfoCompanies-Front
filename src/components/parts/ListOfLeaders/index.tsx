import { Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, Fragment } from 'react'

import { fetchLeadersBySirens } from '../../../utils/api/leaderAPI'
import { PleaseSelectACompanyText } from '../../common/Texts'
import DetailsLeader from '../DetailsLeader'

type ListOfLeadersProps = {
  siren: string | undefined
}

const ListOfLeaders: FC<ListOfLeadersProps> = ({ siren }) => {
  const { data: leaders, isLoading } = useQuery({
    queryKey: ['leader', siren],
    queryFn: () => {
      if (siren) {
        return fetchLeadersBySirens(siren)
      }
    },
  })

  if (isLoading) {
    return <a>Chargement ...</a>
  }

  if (leaders === undefined) {
    return <PleaseSelectACompanyText />
  }

  if (leaders === null || leaders.length === 0) {
    return 'Pas de dirigeant trouvé'
  }

  return (
    <Fragment>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Typography level="h4">Dirigeants</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '320px',
          overflowY: 'auto',
        }}
      >
        {leaders.map((leader, index) => (
          <DetailsLeader key={index} leader={leader} />
        ))}
      </div>
    </Fragment>
  )
}

export default ListOfLeaders
