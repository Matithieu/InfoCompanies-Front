import Loading from '@/components/common/Loading/Loading'
import {
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Typography,
} from '@mui/joy'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { User } from '../../../data/types/index.types'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import useUserStore from '../../../stores/userStore'
import { fetchUser, updateUser } from '../../../utils/api/queries'
import { isNotNU } from '../../../utils/assertion.util'
import AccountMessages from '../account.messages'

// ToDo: Migrate this to React Hook Form
const Account: FC = () => {
  const { user, setUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(user)

  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const mutation = useMutation({
    mutationFn: () => updateUser(editedUser as User),
    mutationKey: ['updateUser' + editedUser?.email],
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`)
    },
    onSuccess: () => {
      refetch()
      toast.success('User updated')
    },
  })

  useEffect(() => {
    if (data) {
      setEditedUser(data)
      setUser(data)
    }
  }, [data, setUser])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (user !== null) {
      setIsEditing(false)
      mutation.mutate()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof User,
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [key]: e.target.value })
    }
  }

  if (isNotNU(editedUser)) {
    return (
      <Card
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Typography gutterBottom level="h3">
          {formatMessage(AccountMessages.accountDetails)}
        </Typography>
        <Divider />

        <form>
          <Grid container spacing={3}>
            <Grid md={12} xs={12}>
              <FormControl>
                <FormLabel htmlFor="firstName">
                  {formatMessage(commonMessages.firstName)}
                </FormLabel>
                <Input
                  disabled={!isEditing}
                  id="firstName"
                  value={editedUser.firstName}
                  onChange={(e) => handleChange(e, 'firstName')}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">
                  {' '}
                  {formatMessage(commonMessages.lastName)}
                </FormLabel>
                <Input
                  disabled={!isEditing}
                  id="lastName"
                  value={editedUser.lastName}
                  onChange={(e) => handleChange(e, 'lastName')}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="phone">
                  {' '}
                  {formatMessage(commonMessages.phone)}
                </FormLabel>
                <Input
                  disabled={!isEditing}
                  id="phone"
                  value={editedUser.phone}
                  onChange={(e) => handleChange(e, 'phone')}
                />
              </FormControl>
            </Grid>
          </Grid>

          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Loading isCentered isLoading={mutation.isPending}>
              <Button
                color={isEditing ? 'primary' : 'neutral'}
                variant="outlined"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing
                  ? formatMessage(commonMessages.save)
                  : formatMessage(commonMessages.edit)}
              </Button>
            </Loading>
          </div>
        </form>
      </Card>
    )
  }
}

export default Account
