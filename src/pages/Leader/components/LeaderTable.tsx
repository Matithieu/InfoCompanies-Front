import { Leader } from '@/data/types/index.types'
import { Table } from '@mui/joy'
import { Paper, TableBody, TableContainer, TableHead } from '@mui/material'
import { FC } from 'react'

import LeaderHeaderRenderer from './LeaderHeaderRenderer'
import LeaderRowRenderer from './LeaderRowRenderer'

type LeaderTableProps = {
  leader: Leader
}

const LeaderTable: FC<LeaderTableProps> = ({ leader }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ minWidth: 650 }}>
        <TableHead>
          <LeaderHeaderRenderer
            headers={[
              {
                label: 'Leader',
              },
              {
                label: 'Value',
                align: 'right',
              },
            ]}
          />
        </TableHead>
        <TableBody>
          <LeaderRowRenderer label="Siren" value={leader.siren} />
          <LeaderRowRenderer label="Role" value={leader.role} />
          <LeaderRowRenderer
            label="Gestion Number"
            value={leader.gestionNumber}
          />
          <LeaderRowRenderer label="Type" value={leader.type} />
          <LeaderRowRenderer label="Event name" value={leader.eventName} />
          <LeaderRowRenderer label="Usage name" value={leader.usageName} />
          <LeaderRowRenderer label="Pseudo" value={leader.pseudo} />
          <LeaderRowRenderer label="Company Name" value={leader.companyName} />
          <LeaderRowRenderer label="Legal form" value={leader.legalForm} />
          <LeaderRowRenderer label="ID" value={leader.idData.toString()} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LeaderTable
