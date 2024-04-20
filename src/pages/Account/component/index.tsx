import { ChangeEvent, useEffect, useState } from "react"
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
} from "@mui/joy"
import { useQuery } from "@tanstack/react-query"

import { User } from "../../../data/types/user"
import useAuthStore from "../../../store/authStore"
import { fetchUser } from "../../../utils/api"
import { parseJsonToUser } from "../../../utils/parseJsonToObject"

export default function Account() {
  const { authUser, requestLoading, setAuthUser, setRequestLoading } =
    useAuthStore()
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user" + authUser?.email],
    queryFn: () => fetchUser(),
    retry: 1,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setAuthUser(parseJsonToUser(data))
      setEditedUser(parseJsonToUser(data))
    }
  }, [data, setAuthUser])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    setRequestLoading(true)
    setEditMode(false)
    setAuthUser(editedUser as User)
    setRequestLoading(false)
    // Add your logic here to save the modifications
    // Example: simulate a save
    setTimeout(() => setRequestLoading(false), 2000)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setEditedUser({ ...editedUser, [key]: e.target.value } as User)
  }

  if (isPending) {
    return <CircularProgress />
  } else if (isError) {
    return <div>{error?.message}</div>
  } else if (authUser != null) {
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
                  value={editedUser?.firstName ?? ""}
                  onChange={(e) => handleChange(e, "firstName")}
                />
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  disabled={!editMode}
                  id="name"
                  value={editedUser?.lastName ?? ""}
                  onChange={(e) => handleChange(e, "name")}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  disabled
                  id="email"
                  value={editedUser?.email ?? ""}
                  onChange={(e) => handleChange(e, "email")}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  disabled={!editMode}
                  id="phone"
                  value={editedUser?.phone ?? ""}
                  onChange={(e) => handleChange(e, "phone")}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {requestLoading ? (
              <CircularProgress />
            ) : !editMode ? (
              <Button color="primary" variant="outlined" onClick={handleEdit}>
                Editer
              </Button>
            ) : (
              <Button color="neutral" variant="outlined" onClick={handleSave}>
                Sauvegarder
              </Button>
            )}
          </div>
        </form>
      </Card>
    )
  }
}
