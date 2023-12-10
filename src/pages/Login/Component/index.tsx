import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import axiosInstance from '../../../utils/axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, Link, TextField, Typography, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleLogo from '../../../assets/google.svg';
import { getGoogleUrl } from '../../../utils/getGoogleUrl';
import useStore from '../../../store/authStore';
import { IUser } from '../../../data/IUser';

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  const from = ((location.state as any)?.from.pathname as string) || '/dashboard'; // Redirect to dashboard by default
  const { setAuthUser, setRequestLoading } = useStore();

  // Create a new IUser object for testing. Remove this when you have implemented the login logic with the API
  const newIUser: IUser = {
    id: "",
    name: "",
    email: "",
    role: "",
    photo: "",
    provider: "",
    verified: "",
  };

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, register, formState: { errors } } = methods;

  const loginUser: SubmitHandler<LoginInput> = async (data) => {
    try {
      setLoading(true);
      store.setRequestLoading(true);


      // Test the protected route
      setAuthUser(newIUser);
      setRequestLoading(false);
      console.log("authUser", store.authUser);

      // TODO: Should return a IUser object from the API
      /*
      const response = await axiosInstance.post('/login', data);
      const { token, refreshToken } = response.data;

      Cookies.set('user-jwt', token, { secure: true, sameSite: 'strict' });
      Cookies.set('refresh-token', refreshToken, { secure: true, sameSite: 'strict' });
      */

      navigate(from);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed', {
        position: 'top-right',
      });
    } finally {
      setLoading(false);
      store.setRequestLoading(false);
    }
  };

  useEffect(() => {
    if (store.authUser) navigate(from); // If authUser is not null, navigate to the 'from' route
  }, [store.authUser, navigate, from]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "4rem" }}>
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          {errors.email && <a style={{ color: "red" }}>{errors.email.message}</a>}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && <a style={{ color: "red" }}>{errors.password.message}</a>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2">Or</Typography>
          </Divider>

          <Button
            href={getGoogleUrl(from)}
            fullWidth
            variant="contained"
            sx={{ mb: 2, backgroundColor: "#3b5998" }}
            startIcon={<img src={GoogleLogo} alt="Google sign-in" style={{ height: "20px" }} />}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </Container>

  );
};

export default LoginPage;
