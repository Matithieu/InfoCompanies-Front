import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import LoadingCircular from '../../components/common/Loading/LoadingCircular'
import {
  toastErrorConnect,
  toastErrorReconnect,
  toastSuccessAlreadySubscribed,
  toastWarnSelectSubscription,
} from '../../components/common/Toasts/toasts'
import useAuthManager from '../../hooks/useAuthManager'
import useAuthStore from '../../store/authStore'
import { fetchUser } from '../../utils/api/queries'
import { isNotNU } from '../../utils/assertion.util'
import { routesPath } from '../../utils/navigation/routesPath'

export const ProtectedRoutes = () => {
  const { authUser, setAuthUser, requestLoading } = useAuthStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNU(data)) {
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  if (requestLoading || isFetching) {
    return <LoadingCircular />
  }

  if (authUser === null && !isSuccess) {
    toastErrorReconnect()
    return <Navigate to={routesPath.base} />
  }

  if (authUser?.isVerified === false && isSuccess) {
    toastWarnSelectSubscription()
    return <Navigate to={routesPath.base} />
  }

  return <Outlet />
}

export const ProtectedSimpleRoutes = () => {
  const { authUser, setAuthUser, requestLoading } = useAuthStore()
  const authManager = useAuthManager()
  const urlLocation = window.location.pathname

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNU(data)) {
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  if (requestLoading || isFetching) {
    return <LoadingCircular />
  }

  if (authUser === null && !isSuccess) {
    toastErrorConnect()
    return <Navigate to={routesPath.base} />
  }

  if (
    authUser?.isVerified === false &&
    urlLocation !== '/ui/subscription' &&
    isSuccess
  ) {
    toastWarnSelectSubscription()
    return <Navigate to={routesPath.subscription} />
  }

  if (authUser?.isVerified && urlLocation === '/ui/subscription') {
    toastSuccessAlreadySubscribed()
    // Renew the cookie to have the correct roles
    authManager.signIn()
  }

  return <Outlet />
}
