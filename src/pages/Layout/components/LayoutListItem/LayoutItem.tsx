import {
  Box,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from '@mui/joy'
import { FC, ReactNode } from 'react'

type LayoutListItemProps = {
  icon: ReactNode
  open: boolean
  title: string
  navigation: () => void
}

const LayoutItem: FC<LayoutListItemProps> = ({
  icon,
  open,
  title,
  navigation,
}) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => navigation()}>
        <Box sx={{ fontSize: { xs: '1.5rem', md: '1.5rem' } }}>{icon}</Box>
        {open && (
          <ListItemContent sx={{ flexGrow: 1 }}>
            <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
              {title}
            </Typography>
          </ListItemContent>
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default LayoutItem
