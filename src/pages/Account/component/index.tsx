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
import { ChangeEvent, useEffect, useState } from "react"
import { User } from "../../../data/types/user"
import useAuthStore from "../../../store/authStore"
import { parseJsonToUser } from "../../../utils/parseJsonToObject"
import { fetchUser } from "../../../utils/api"

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
        <Typography level="h3" gutterBottom>
          Détails du compte
        </Typography>
        <Divider />

        <form>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  value={editedUser?.firstName ?? ""}
                  onChange={(e) => handleChange(e, "firstName")}
                  disabled={!editMode}
                />
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  value={editedUser?.lastName ?? ""}
                  onChange={(e) => handleChange(e, "name")}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  value={editedUser?.email ?? ""}
                  onChange={(e) => handleChange(e, "email")}
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={6}>
              <FormControl>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  id="phone"
                  value={editedUser?.phone ?? ""}
                  onChange={(e) => handleChange(e, "phone")}
                  disabled={!editMode}
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
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                Editer
              </Button>
            ) : (
              <Button variant="outlined" color="neutral" onClick={handleSave}>
                Sauvegarder
              </Button>
            )}
          </div>
        </form>
      </Card>
    )
  }
}
