import { Typography } from '@mui/material'
import { FC } from 'react'

type NoAvailableTextProps = {
  message: string
}

export const NoAvailableText: FC<NoAvailableTextProps> = ({ message }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </div>
  )
}
