import { ListItemButton } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { useAppNavigate } from '../../../utils/navigation/navigation'
import { RoutesPath } from '../../../utils/navigation/routesPath'

interface RedirectListItemButtonProps {
  path: RoutesPath
}

export const RedirectListItemButton = (props: RedirectListItemButtonProps) => {
  const { navigation } = useAppNavigate()

  return (
    <ListItemButton
      onClick={() => {
        navigation.toPage(props.path)
      }}
    >
      <Outlet />
    </ListItemButton>
  )
}
