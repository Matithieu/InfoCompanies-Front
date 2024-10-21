import { IconButton } from '@mui/joy'
import React from 'react'

type LinkIconProps = {
  url: string
  icon: JSX.Element
  style: React.CSSProperties
}

export default function LinkIcon({ url, icon, style }: LinkIconProps) {
  return (
    <IconButton
      style={{ ...style }}
      sx={{ '--IconButton-size': '20px' }}
      onClick={(e) => {
        e.stopPropagation()
        window.open(url, '_blank')
      }}
    >
      {icon}
    </IconButton>
  )
}
