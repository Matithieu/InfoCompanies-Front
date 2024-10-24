import { ListDivider, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, Fragment } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { fetchLeadersBySirens } from '../../../utils/api/queries'
import { LoadingText } from '../../common/Loading/TextLoading'
import { PleaseSelectACompanyText } from '../../common/Texts'
import DetailsLeaderRow from './components/DetailsLeaderRow'

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
    return <LoadingText />
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
        <Typography level="h4">
          {' '}
          {formatMessage(commonMessages.noLeadersFound)}
        </Typography>
      </div>
    )
  }

  return (
    <Fragment>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Typography level="h4">
          {formatMessage(commonMessages.leaders, {
            itemCount: leaders.length,
          })}
        </Typography>
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
          <div key={index} style={{ marginBottom: 15 }}>
            <DetailsLeaderRow key={index} leader={leader} />
            <div style={{ marginBottom: 10 }} />
            {index < leaders.length - 1 && <ListDivider />}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default ListOfLeaders
