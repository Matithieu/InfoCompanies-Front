import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { toast } from 'react-toastify';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleLogo from '../../assets/google.png';
import { getGoogleUrl } from '../../utils/getGoogleUrl';
import useAuthStore from '../../store/authStore';
import { dataReceived } from '../Register';
//import Cookies from 'js-cookie';

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
  const { authUser, setAuthUser, setRequestLoading } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  // Redirect to the page the user was on before logging in
  const from = ((location.state as any)?.from.pathname as string) || '/dashboard'; // Redirect to dashboard by default

  // Create a new User object for testing. Remove this when you have implemented the login logic with the API
  //const newUser = new User("1", "Mat", "amarmathi@gmail.com", "0454784817", "Le Tholonet", "Avenue de la mouine", "admin", "provider", false);
  //setAuthUser(newUser);
  //setRequestLoading(false);

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, register, formState: { errors } } = methods;

  const loginUser: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      setRequestLoading(true);
      // Replace the URL with the URL in an .env
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/authenticate`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

      const dataReceived: dataReceived = await response.json();
      console.log("data ", dataReceived);

      if (response.ok) {
        localStorage.setItem("token", dataReceived.bearerToken.accessToken);
        console.log("user ", dataReceived.user);
        setAuthUser(dataReceived.user);
        setRequestLoading(false);
        navigate("/dashboard");
      }

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed', {
        position: 'top-right',
      });
    } finally {
      setRequestLoading(false);
    }
  }

  useEffect(() => {
    if (authUser) navigate(from); // If authUser is not null, navigate to the 'from' route
  }, [authUser, navigate, from]);

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
              <Link href="/register" variant="body2">
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
