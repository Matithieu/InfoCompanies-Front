import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Avatar, Box, IconButton, Typography } from '@mui/joy'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'
import useAuthStore from '../../../store/authStore'
import { useAppNavigate } from '../../../utils/navigation/navigation'

const LayoutAvatarItem: FC = () => {
  const { authUser } = useAuthStore()
  const authManager = useAuthManager()
  const { navigation } = useAppNavigate()

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          navigation.toSettings()
        }}
      >
        <Avatar size="md" variant="outlined">
          {authUser?.firstName
            ?.charAt(0)
            .toLocaleUpperCase()
            .toLocaleUpperCase() ?? 'E'}
        </Avatar>
      </IconButton>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level="title-md">
          {authUser?.firstName ?? 'Error'}
        </Typography>
        <Typography level="body-sm">{authUser?.lastName ?? 'Error'}</Typography>
      </Box>
      <IconButton
        color="neutral"
        size="lg"
        variant="plain"
        onClick={(e) => {
          e.preventDefault()
          authManager.signOut()
        }}
      >
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default LayoutAvatarItem
