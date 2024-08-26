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
    queryFn: async () => {
      if (siren) {
        return await fetchLeadersBySirens(siren)
      }
    },
    enabled: !!siren,
  })

  if (isLoading) {
    return (
      <a
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Chargement ...
      </a>
    )
  }

  if (leaders === undefined) {
    return <PleaseSelectACompanyText />
  }

  if (leaders.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography level="h4">Aucun dirigeant trouvé</Typography>
      </div>
    )
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
