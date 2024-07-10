import Typography from '@mui/joy/Typography'
import * as React from 'react'

interface TitleProps {
  children?: React.ReactNode
}

export default function Title(props: TitleProps) {
  return (
    <Typography color="primary" component="h2" level="h4">
      {props.children}
    </Typography>
  )
}
