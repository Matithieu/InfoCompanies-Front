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
import { isNotNU } from '../../../utils/assertion.util'

const Account: FC = () => {
  const { authUser, setAuthUser } = useAuthStore()
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(authUser)

  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    retry: 1,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
      setEditMode(false)
      mutation.mutate()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setEditedUser({ ...editedUser, [key]: e.target.value } as User)
  }

  if (isNotNU(editedUser)) {
    return (
      <Card>
        <Typography gutterBottom level="h3">
          Détails du compte
        </Typography>
        <Divider />

        <form>
          <Grid container spacing={3}>
            <Grid md={12} xs={12}>
              <FormControl>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  disabled={!editMode}
                  id="firstName"
                  value={editedUser.firstName}
                  onChange={(e) => handleChange(e, 'firstName')}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  disabled={!editMode}
                  id="lastName"
                  value={editedUser.lastName}
                  onChange={(e) => handleChange(e, 'lastName')}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  disabled={!editMode}
                  id="phone"
                  value={editedUser.phone ?? undefined}
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
            {mutation.isPending ? (
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
