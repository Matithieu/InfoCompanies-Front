import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'

interface LeaderRowRendererProps {
  label: string
  value: string
}

const LeaderRowRenderer: FC<LeaderRowRendererProps> = ({ label, value }) => {
  return (
    <TableRow key={label}>
      <TableCell>{label}</TableCell>
      <TableCell align="left">{value}</TableCell>
    </TableRow>
  )
}

export default LeaderRowRenderer
