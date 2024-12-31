import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'

interface LeaderHeaderRendererProps {
  headers: {
    label: string
    align?: 'left' | 'right'
  }[]
}

const LeaderHeaderRenderer: FC<LeaderHeaderRendererProps> = ({ headers }) => {
  return (
    <>
      <TableRow>
        {headers.map(({ label, align }) => (
          <TableCell key={label} align={align}>
            {label}
          </TableCell>
        ))}
      </TableRow>
    </>
  )
}

export default LeaderHeaderRenderer
