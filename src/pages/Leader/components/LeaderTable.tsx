import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { Leader } from '@/types/index.types'
import { Table } from '@mui/joy'
import { Paper, TableBody, TableContainer, TableHead } from '@mui/material'
import { FC } from 'react'

import leaderMessages from '../leader.messages'
import LeaderHeaderRenderer from './LeaderHeaderRenderer'
import LeaderRowRenderer from './LeaderRowRenderer'

type LeaderTableProps = {
  leader: Leader
}

const LeaderTable: FC<LeaderTableProps> = ({ leader }) => {
  const rows = [
    { label: formatMessage(leaderMessages.siren), value: leader.siren },
    { label: formatMessage(leaderMessages.role), value: leader.role },
    {
      label: formatMessage(leaderMessages.gestionNumber),
      value: leader.gestionNumber,
    },
    { label: formatMessage(leaderMessages.type), value: leader.type },
    { label: formatMessage(leaderMessages.eventName), value: leader.eventName },
    { label: formatMessage(leaderMessages.usageName), value: leader.usageName },
    { label: formatMessage(leaderMessages.pseudo), value: leader.pseudo },
    {
      label: formatMessage(leaderMessages.companyName),
      value: leader.companyName,
    },
    { label: formatMessage(leaderMessages.legalForm), value: leader.legalForm },
  ]

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <LeaderHeaderRenderer
            headers={[
              { label: formatMessage(commonMessages.field) },
              { label: formatMessage(commonMessages.value), align: 'right' },
            ]}
          />
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <LeaderRowRenderer
              key={index}
              label={row.label}
              value={row.value}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LeaderTable
