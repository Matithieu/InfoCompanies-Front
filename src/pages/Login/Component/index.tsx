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
import "./index.css"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, Link, Paper, TextField, Typography } from "@mui/material";

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
      console.log(VITE_SERVER_ENDPOINT);
      const response = await fetch(`${VITE_SERVER_ENDPOINT}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw await response.json();
      }

      store.setRequestLoading(false);
      console.log("login successful");
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Poppins',
        }}
      >

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{
          mt: 1, fontFamily: 'Poppins',
        }}>
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
          {errors.email && (
            <p className="text-red-700 text-sm mt-1">
              {errors.email?.message}
            </p>
          )}

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

          {errors.password && (
            <p className="text-red-700 text-sm mt-1">
              {errors.password?.message}
            </p>
          )}

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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>



          <Divider>
            <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
              Or
            </Typography>
          </Divider>

          <a
            className="px-7 py-2 text-white font-medium text-sm rounded shadow-md w-full flex justify-center items-center mb-3"
            style={{ backgroundColor: "#3b5998", padding: "0.25rem" }}
            href={getGoogleUrl(from)}
          >
            <img className="pr-2" src={GoogleLogo} alt="" style={{ height: "2rem", marginRight: "7px" }} />
            Continue with Google
          </a>

        </Box>
      </Box>
    </Container>

  );
};

export default LoginPage;
