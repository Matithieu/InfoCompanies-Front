import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../data/Account/user";
import { ErrorJwtAuth } from "../../data/errorAuthJwt";
import useAuthStore from "../../store/authStore";
import { userJsonToUser } from "../../utils/userJsonToUser";

async function fetchAccountData(email: string) {
  const response = await fetch("http://localhost:8080/api/v1/user/" + email, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data: User = await response.json();
    return data;
  } else {
    const error: ErrorJwtAuth = await response.json();
    if (response.status === 401) {
      toast.error(error.message);
      throw new Error(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

export default function Account() {
  const { authUser, requestLoading, setAuthUser, setRequestLoading } =
    useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companies", authUser?.email],
    queryFn: () => fetchAccountData(authUser?.email ?? ""),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setAuthUser(userJsonToUser(data));
      setEditedUser(userJsonToUser(data));
    }
  }, [data, setAuthUser]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setRequestLoading(true);
    setEditMode(false);
    setAuthUser(editedUser as User);
    setRequestLoading(false);
    // Add your logic here to save the modifications
    // Example: simulate a save
    setTimeout(() => setRequestLoading(false), 2000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setEditedUser({ ...editedUser, [key]: e.target.value } as User);
  };

  if (isPending) {
    return <CircularProgress />;
  } else if (isError) {
    return <div>{error?.message}</div>;
  } else if (authUser != null) {
    return (
      <Box>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Typography level="h3" gutterBottom>
            Détails du compte
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    value={editedUser?.name ?? ""}
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
                    value={editedUser?.phone?.toString() ?? ""}
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
        </Stack>
      </Box>
    );
  }
}
