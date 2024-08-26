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
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        style={{
          cursor: 'pointer',
          display: 'flex',
          gap: 10,
          paddingRight: 30,
          width: '100%',
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigation.toAccount()
        }}
      >
        <Avatar size="md" variant="outlined">
          {authUser?.firstName
            ?.charAt(0)
            .toLocaleUpperCase()
            .toLocaleUpperCase() ?? 'X'}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            level="title-md"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {authUser?.firstName ?? 'Error'}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {authUser?.lastName ?? 'Error'}
          </Typography>
        </Box>
      </IconButton>
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
