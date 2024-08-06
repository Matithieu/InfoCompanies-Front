import { Divider, Table, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, Fragment } from 'react'

import { fetchLeadersBySirens } from '../../../utils/api/leaderAPI'
import { isNotNU } from '../../../utils/assertion.util'
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

  if (isNotNU(leaders)) {
    return (
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography level="h4">Dirigeants</Typography>
        </div>
        <Table
          aria-label="List Of Leaders"
          style={{ display: 'flex', overflowY: 'auto', maxHeight: '320px' }}
        >
          <tbody>
            <tr
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 25,
                marginTop: 25,
              }}
            >
              {leaders.map((leader, index) => {
                return (
                  <td key={index}>
                    <DetailsLeader leader={leader} />
                    <Divider />
                  </td>
                )
              })}
            </tr>
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default ListOfLeaders
