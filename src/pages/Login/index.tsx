import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TypeOf, object, string } from "zod";
import GoogleLogo from "../../assets/google.png";
import useAuthStore from "../../store/authStore";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { dataReceived } from "../Register";

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
  const from = (location.state as any)?.from.pathname as string; // Redirect to dashboard by default

  /*
  // Create a new User object for testing. Remove this when you have implemented the login logic with the API
  const newUser = new User("1", "Mat", "amarmathi@gmail.com", "0454784817", "Le Tholonet", "Avenue de la mouine", "admin", "provider", false);
  setAuthUser(newUser);
  setRequestLoading(false);
  */

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const loginUser: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      setRequestLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/authenticate`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataReceived: dataReceived = await response.json();
      console.log("data ", dataReceived);

      if (response.ok) {
        localStorage.setItem("token", dataReceived.bearerToken.accessToken);
        console.log("user ", dataReceived.user);
        setAuthUser(dataReceived.user);
        setRequestLoading(false);
        if (dataReceived.user.verified === true) {
          console.log("verified");
          navigate("/dashboard");
        } else {
          console.log("not verified");
          navigate("/subscription");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.verified === true) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "4rem" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" level="h4">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Input
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            sx={{ mb: 2 }}
          />
          {errors.email && (
            <a style={{ color: "red" }}>{errors.email.message}</a>
          )}

          <Input
            required
            fullWidth
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && (
            <a style={{ color: "red" }}>{errors.password.message}</a>
          )}

          <Button type="submit" fullWidth variant="soft" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid xs>
              <Link href="" level="body-md">
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link href="/register" level="body-md">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }}>
            <Typography level="body-md">Or</Typography>
          </Divider>

          <Button
            href={getGoogleUrl(from)}
            fullWidth
            variant="soft"
            sx={{ mb: 2, backgroundColor: "#3b5998" }}
            startDecorator={
              <img
                src={GoogleLogo}
                alt="Google sign-in"
                style={{ height: "20px" }}
              />
            }
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
