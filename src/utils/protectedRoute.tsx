import { Navigate, Outlet } from "react-router-dom"
import { toast } from "react-toastify"

import Loading from "../pages/Loading"
import useAuthStore from "../store/authStore"

import { getUser } from "./slice"

export const ProtectedRoutes = () => {
  const { authUser, requestLoading } = useAuthStore()
  const userFromLocalStorageOIDC = getUser()

  if (
    userFromLocalStorageOIDC === null ||
    userFromLocalStorageOIDC?.expired === true
  ) {
    toast.error("Please connect to continue.")
    return <Navigate to="/" />
  }

  if (userFromLocalStorageOIDC?.expired === false) {
    return <Outlet />
    // make a page to reconnect
  }

  if (authUser?.isVerified === false) {
    return <Navigate to="/subscription" />
  }

  if (requestLoading) {
    return <Loading />
  }

  return <Outlet />
}

export const ProtectedSimpleRoutes = () => {
  const { authUser, requestLoading } = useAuthStore()
  const userFromLocalStorageOIDC = getUser()

  if (
    userFromLocalStorageOIDC == null ||
    userFromLocalStorageOIDC?.expired === true
  ) {
    toast.error("Please connect to continue.")
    return <Navigate to="/" />
  }

  if (
    authUser?.isVerified === false &&
    window.location.pathname !== "/subscription"
  ) {
    return <Navigate to="/subscription" />
  }

  if (requestLoading) {
    return <Loading />
  }

  return <Outlet />
}
