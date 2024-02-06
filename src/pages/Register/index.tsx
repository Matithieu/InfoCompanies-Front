import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Input,
  Typography
} from "@mui/joy";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TypeOf, object, string } from "zod";
import GoogleLogo from "../../assets/google.png";
import { User } from "../../data/Account/user";
import useAuthStore from "../../store/authStore";
import { getGoogleUrl } from "../../utils/getGoogleUrl";

export type DataReceived = {
  bearerToken: {
    accessToken: string;
    tokenType: string;
  };
  user: User;
};

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRequestLoading, setAuthUser, authUser } = useAuthStore();
  const from =
    (location.state as { from: { pathname: string } })?.from.pathname ||
    "/dashboard"; // Redirect to dashboard by default

  const registerUser = async (data: RegisterInput) => {
    try {
      setRequestLoading(true);
      console.log("authUser ", authUser);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataReceived: DataReceived = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", dataReceived.bearerToken.accessToken);
        console.log("user ", dataReceived.user);
        setAuthUser(dataReceived.user);
        setRequestLoading(false);

        if (dataReceived.user.verified === true) {
          navigate("/dashboard");
        } else {
          navigate("/subscription");
        }
      }

      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error: any) {
      setRequestLoading(false);
      if (error.error) {
        error.error.forEach((err: any) => {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
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
        autoClose: 5000,
      });
    }
  };

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
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

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  useEffect(() => {
    if (authUser?.verified === true) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "4rem" }}>
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
          Sign Up
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
            placeholder="Full Name"
            autoFocus
            {...register("name")}
          />
          {errors.name && (
            <Typography style={{ color: "red" }}>
              {errors.name.message}
            </Typography>
          )}

          <Input
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <Typography style={{ color: "red" }}>
              {errors.email.message}
            </Typography>
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
            <Typography style={{ color: "red" }}>
              {errors.password.message}
            </Typography>
          )}

          <Input
            required
            fullWidth
            placeholder="Confirm Password"
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <Typography style={{ color: "red" }}>
              {errors.passwordConfirm.message}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="soft" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid>
              <Link to="/login">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }}>
            <Typography level="body-sm">Or</Typography>
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

export default RegisterPage;
