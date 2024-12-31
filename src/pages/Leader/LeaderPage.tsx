import HeaderTitle from '@/components/common/Texts/HeaderTitle.tsx'
import { Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router'

import commonMessages from '../../services/intl/common.messages.ts'
import { formatMessage } from '../../services/intl/intl.tsx'
import { fetchLeaderById } from '../../utils/api/queries.ts'
import { asserts, isNotNU } from '../../utils/assertion.util.ts'
import LeaderTable from './components/LeaderTable.tsx'

const LeaderPage: FC = () => {
  const id = useParams().id
  asserts(isNotNU(id))

  const { data: leader, isLoading } = useQuery({
    queryKey: ['leader', id],
    queryFn: () => fetchLeaderById(id),
  })

  if (isLoading) {
    return formatMessage(commonMessages.loading)
  }

  if (!isNotNU(leader)) {
    return formatMessage(commonMessages.noAvailableData)
  }

  if (isNotNU(leader)) {
    return (
      <Grid flexDirection="column" sx={{ px: { xs: 2, md: 6 } }}>
        <HeaderTitle text={leader.lastName + ' ' + leader.firstName} />

        <Grid mt={2}>
          <LeaderTable leader={leader} />
        </Grid>
      </Grid>
    )
  }
}

export default LeaderPage
