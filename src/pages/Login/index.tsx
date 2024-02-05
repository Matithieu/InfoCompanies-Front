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
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TypeOf, object, string } from "zod";
import GoogleLogo from "../../assets/google.png";
import { ErrorJwtAuth } from "../../data/errorAuthJwt";
import useAuthStore from "../../store/authStore";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { userJsonToUser } from "../../utils/userJsonToUser";
import { DataReceived } from "../Register";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

async function loginUser(data: LoginInput) {
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

  if (response.ok) {
    const data: DataReceived = await response.json();
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

const LoginPage = () => {
  const { authUser, setAuthUser, setRequestLoading } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const from =
    (location.state as { from: { pathname: string } })?.from.pathname ||
    "/dashboard"; // Redirect to dashboard by default

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: (values: LoginInput) => loginUser(values),
    retry: 1,
  });

  useEffect(() => {
    if (authUser?.verified === true) {
      navigate("/dashboard");
    } else if (authUser?.verified === false) {
      toast.error("Redirected to subscription page.");
      navigate("/subscription");
    }
  }, [authUser, navigate]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    setRequestLoading(true);
    mutation.mutate(values, {
      onSuccess: (data) => {
        console.log(data);
        setAuthUser(userJsonToUser(data.user));
        localStorage.setItem("token", data.bearerToken.accessToken);
        setRequestLoading(false);
      },
    });
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
