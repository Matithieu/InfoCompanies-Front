import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Avatar, Box, IconButton, Typography } from '@mui/joy'
import { FC } from 'react'

import { useAppNavigate } from '../../../hooks/useAppNavigate'
import useAuthManager from '../../../hooks/useAuthManager'
import useUserStore from '../../../stores/UserStore'

interface LayoutAvatarItemProps {
  open: boolean
}

const LayoutAvatarItem: FC<LayoutAvatarItemProps> = ({ open }) => {
  const { user } = useUserStore()
  const authManager = useAuthManager()
  const { navigation } = useAppNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 60,
        maxHeight: 60,
      }}
    >
      <IconButton
        style={{
          display: 'flex',
          gap: open ? 10 : 0,
          justifyContent: open ? 'space-between' : 'center',
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigation.toAccount()
        }}
      >
        <Avatar size="md" variant="outlined">
          {user?.firstName?.charAt(0).toLocaleUpperCase() ?? 'X'}
        </Avatar>

        {open && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            <Typography level="title-md">
              {user?.firstName ?? 'Error'}
            </Typography>

            <Typography level="body-sm">{user?.lastName ?? 'Error'}</Typography>
          </Box>
        )}
      </IconButton>

      <IconButton
        color="neutral"
        size="lg"
        sx={{
          display: open ? 'flex' : 'none',
        }}
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
