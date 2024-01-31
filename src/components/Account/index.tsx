import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../data/Account/user";
import { ErrorJwtAuth } from "../../data/errorAuthJwt";
import useAuthStore from "../../store/authStore";

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
  const { authUser, requestLoading, setRequestLoading } = useAuthStore();
  const [accountData, setAccountData] = useState({ ...authUser });
  const [editMode, setEditMode] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["companies", authUser?.getEmail()],
    queryFn: () => fetchAccountData(authUser?.getEmail() ?? ""),
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setAccountData(data);
    }
  }, [data]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setRequestLoading(true);
    setEditMode(false);
    // Ajoutez ici la logique pour enregistrer les modifications
    // Exemple: simuler un enregistrement
    setTimeout(() => setRequestLoading(false), 2000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setAccountData({ ...accountData, [key]: e.target.value });
  };

  if (isPending) {
    return <CircularProgress />;
  } else if (isError) {
    return <div>{error?.message}</div>;
  }
  return (
    <Box>
      <Paper
        style={{
          padding: "20px",
          marginTop: "20px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Détails du compte
        </Typography>
        <Grid container spacing={3}>
          {Object.keys(accountData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={accountData[key as keyof typeof accountData] ?? ""}
                variant="outlined"
                InputProps={{
                  readOnly: !editMode,
                }}
                onChange={(e) => handleChange(e, key)}
              />
            </Grid>
          ))}
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
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editer
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleSave}>
              Sauvegarder
            </Button>
          )}
        </div>
      </Paper>
    </Box>
  );
}
