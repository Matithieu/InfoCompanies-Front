import LoadingText from '@/components/common/Loading/TextLoading'
import { NoAvailableLeaderText } from '@/components/common/Texts/NoContentAvailable/NoContentAvailable'
import { ListDivider, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { fetchLeadersBySiren } from '../../../utils/api/queries'
import { PleaseSelectACompanyText } from '../../common/Texts/PleaseSelectACompanyText'
import LeaderListRowRenderer from './components/LeaderListRowRenderer'
import { removeLeadersWithSameName } from './leader.util'

type ListOfLeadersProps = {
  siren: string | undefined
}

const ListOfLeaders: FC<ListOfLeadersProps> = ({ siren }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['leader', siren],
    queryFn: async () => {
      if (siren) {
        return await fetchLeadersBySiren({ siren })
      }
    },
    enabled: !!siren,
    staleTime: Infinity,
  })

  if (isLoading) {
    return <LoadingText error={error} />
  }

  if (data === undefined) {
    return <PleaseSelectACompanyText />
  }

  if (data.length === 0) {
    return <NoAvailableLeaderText />
  }

  const leaders = removeLeadersWithSameName(data)

  return (
    <>
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
            <LeaderListRowRenderer key={index} leader={leader} />
            <div style={{ marginBottom: 10 }} />

            {index < leaders.length - 1 && <ListDivider />}
          </div>
        ))}
      </div>
    </>
  )
}

export default ListOfLeaders
