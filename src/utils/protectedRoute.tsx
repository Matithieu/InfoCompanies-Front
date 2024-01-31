import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";
import useAuthStore from "../store/authStore";

export const ProtectedRoutes = () => {
  const { authUser, requestLoading } = useAuthStore();

  if (authUser === null) {
    return <Navigate to="/login" />;
  }

  if (requestLoading) {
    return <Loading />;
  }

  if (authUser.verified === false) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const ProtectedSimpleRoutes = () => {
  const { authUser, requestLoading } = useAuthStore();

  if (authUser == null) {
    return <Navigate to="/login" />;
  }

  if (requestLoading) {
    return <Loading />;
  }

  if (
    authUser.verified === false &&
    window.location.pathname !== "/subscription"
  ) {
    return <Navigate to="/subscription" />;
  }

  if (authUser.verified === true) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};
