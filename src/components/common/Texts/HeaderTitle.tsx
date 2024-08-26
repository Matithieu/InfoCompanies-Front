import { Box, Typography } from '@mui/joy'
import { FC } from 'react'

type HeaderTitleProps = {
  text: string
}

const HeaderTitle: FC<HeaderTitleProps> = ({ text }) => {
  return (
    <Box>
      <Typography level="h1" sx={{ marginTop: 2 }}>
        {text}
      </Typography>
    </Box>
  )
}

export default HeaderTitle
