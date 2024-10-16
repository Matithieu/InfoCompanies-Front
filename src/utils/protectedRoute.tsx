import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import {
  toastErrorConnect,
  toastErrorReconnect,
  toastSuccessAlreadySubscribed,
  toastWarnSelectSubscription,
} from '../components/common/Toasts/toasts'
import Loading from '../pages/Loading'
import useAuthStore from '../store/authStore'
import { fetchUser } from './api/queries'
import { isNotNU } from './assertion.util'
import { routesPath } from './navigation/routesPath'

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
    return <Loading />
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
    return <Loading />
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
    return <Navigate to={routesPath.dashboard} />
  }

  return <Outlet />
}
