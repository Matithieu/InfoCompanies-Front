import { Box, Grid, Sheet, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useParams } from 'react-router'

import DetailsLeaderRow from '../../components/parts/LeaderList/components/DetailsLeaderRow.tsx'
import commonMessages from '../../services/intl/common.messages.ts'
import { formatMessage } from '../../services/intl/intl.tsx'
import { fetchLeaderById } from '../../utils/api/queries.ts'
import { asserts, isNotNU } from '../../utils/assertion.util.ts'

const LeaderPage: FC = () => {
  const id = useParams().id
  asserts(id !== undefined, 'id is undefined')

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
      <Box sx={{ display: 'flex' }}>
        <Box component="main">
          <Typography
            component="div"
            level="h4"
            sx={{
              marginTop: 5,
              marginLeft: 10,
              marginBottom: 5,
              alignSelf: 'flex-start',
            }}
          >
            {leader.lastName} {leader.firstName}
          </Typography>

          <Grid
            container
            justifyContent="center"
            paddingBottom="10vh"
            paddingLeft="10vh"
            paddingRight="10vh"
            spacing="3vh"
          >
            <Grid
              container
              justifyContent="space-between"
              marginTop={5}
              spacing={3}
            >
              <Grid md={6} xs={12}>
                <Sheet
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                  }}
                >
                  <DetailsLeaderRow leader={leader} />
                </Sheet>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }
}

export default LeaderPage
