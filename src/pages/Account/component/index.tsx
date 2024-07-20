import {
  Button,
  Card,
  CircularProgress,
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

import { User } from '../../../data/types/user'
import useAuthStore from '../../../store/authStore'
import { fetchUser, updateUser } from '../../../utils/api'

const Account: FC = () => {
  const { authUser, requestLoading, setAuthUser, setRequestLoading } =
    useAuthStore()
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  const mutation = useMutation({
    mutationFn: () => updateUser(editedUser as User),
    mutationKey: ['updateUser' + editedUser?.email],
    retry: 0,
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
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    if (authUser !== null) {
      setRequestLoading(true)
      setEditMode(false)
      mutation.mutate()
      setRequestLoading(false)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setEditedUser({ ...editedUser, [key]: e.target.value } as User)
  }

  if (isPending) {
    return <CircularProgress />
  } else if (isError) {
    return <div>{error?.message}</div>
  } else if (authUser !== null) {
    return (
      <Card>
        <Typography gutterBottom level="h3">
          Détails du compte
        </Typography>
        <Divider />

        <form>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  disabled={!editMode}
                  id="firstName"
                  value={editedUser?.firstName ?? ''}
                  onChange={(e) => handleChange(e, 'firstName')}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  disabled={!editMode}
                  id="lastName"
                  value={editedUser?.lastName ?? ''}
                  onChange={(e) => handleChange(e, 'lastName')}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  disabled
                  id="email"
                  value={editedUser?.email ?? ''}
                  onChange={(e) => handleChange(e, 'email')}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  disabled={!editMode}
                  id="phone"
                  value={editedUser?.phone ?? ''}
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
            {requestLoading ? (
              <CircularProgress />
            ) : (
              <>
                {editMode ? (
                  <Button
                    color="neutral"
                    variant="outlined"
                    onClick={handleSave}
                  >
                    Sauvegarder
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleEdit}
                  >
                    Editer
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </Card>
    )
  }
}

export default Account
