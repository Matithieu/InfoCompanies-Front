import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'

import LoadingCircular from '../../components/common/Loading/LoadingCircular'
import {
  toastErrorConnect,
  toastErrorReconnect,
  toastSuccessAlreadySubscribed,
  toastWarnSelectSubscription,
} from '../../components/common/Toasts/toasts'
import useAuthManager from '../../hooks/useAuthManager'
import useUserStore from '../../stores/userStore'
import { fetchUser } from '../../utils/api/queries'
import { isNotNU } from '../../utils/assertion.util'
import { routesPath } from './routesPath'

export const ProtectedRoutes = () => {
  const { user, setUser } = useUserStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', user],
    queryFn: () => (user === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNU(data)) {
      setUser(data)
    }
  }, [data, setUser])

  if (isFetching) {
    return <LoadingCircular />
  }

  if (user === null && !isSuccess) {
    toastErrorReconnect()
    return <Navigate to={routesPath.base} />
  }

  if (user?.isVerified === false && isSuccess) {
    toastWarnSelectSubscription()
    return <Navigate to={routesPath.base} />
  }

  return <Outlet />
}

export const ProtectedSimpleRoutes = () => {
  const { user, setUser } = useUserStore()
  const authManager = useAuthManager()
  const urlLocation = window.location.pathname

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', user],
    queryFn: () => (user === null ? fetchUser() : Promise.resolve(null)),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isNotNU(data)) {
      setUser(data)
    }
  }, [data, setUser])

  if (isFetching) {
    return <LoadingCircular />
  }

  if (user === null && !isSuccess) {
    toastErrorConnect()
    return <Navigate to={routesPath.base} />
  }

  if (
    user?.isVerified === false &&
    urlLocation !== routesPath.subscription &&
    isSuccess
  ) {
    toastWarnSelectSubscription()
    return <Navigate to={routesPath.subscription} />
  }

  if (user?.isVerified && urlLocation === routesPath.subscription) {
    toastSuccessAlreadySubscribed()
    // Renew the cookie to have the correct roles
    authManager.signIn()
  }

  return <Outlet />
}
