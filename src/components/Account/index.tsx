import { useEffect, useState } from 'react';
import { Container, Grid, TextField, Typography, Paper, Button, CircularProgress } from '@mui/material';
import useAuthStore from '../../store/authStore';

export default function Account() {
  const { authUser, setAuthUser, requestLoading, setRequestLoading } = useAuthStore();
  const [accountData, setAccountData] = useState({ ...authUser });
  const [editMode, setEditMode] = useState(false);

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

  const handleChange = (e : any, key : any) => {
    setAccountData({ ...accountData, [key]: e.target.value });
  };

  const fetchAccountData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/" + authUser?.email , {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if(response.status === 200) {
        console.log("data ", data);
        setAuthUser(data);
      }
    } catch (error) {
      console.log("Error while fetching the account ", error);
    }
  }

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: '20px', marginTop: '20px', boxShadow: '0 3px 10px rgba(0,0,0,0.2)' }}>
        <Typography variant="h4" gutterBottom>
          Détails du compte
        </Typography>
        <Grid container spacing={3}>
          {Object.keys(accountData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={accountData[key]}
                variant="outlined"
                InputProps={{
                  readOnly: !editMode,
                }}
                onChange={(e) => handleChange(e, key)}
              />
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
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
    </Container>
  );
}
