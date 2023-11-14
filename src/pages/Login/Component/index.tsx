import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../../../assets/google.svg";
import { getGoogleUrl } from "../../../utils/getGoogleUrl";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../../store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils/axios";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStore();
  const from = ((location.state as any)?.from.pathname as string) || "/profile";

  const loginUser = async (data: LoginInput) => {
    try {
      store.setRequestLoading(true);
      const VITE_SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
      const response = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Good response ");
      const oui = await response.data;
      Cookies.set("user-jwt", oui.token, {
        //expires: 1 / 24,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh-token", oui.refreshToken, {
        //expires: 1 / 24,
        secure: true,
        sameSite: "strict",
      });

      store.setRequestLoading(false);
      console.log("login successful");
      console.log(response);
      navigate("/dashboard");
    } catch (error: any) {
      store.setRequestLoading(false);
      if (error.error) {
        error.error.forEach((err: any) => {
          toast.error(err.message, {
            position: "top-right",
          });
        });
        return;
      }
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

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
