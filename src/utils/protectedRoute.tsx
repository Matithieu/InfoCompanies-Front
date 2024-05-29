import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../pages/Loading'
import useAuthStore from '../store/authStore'
import { fetchUser } from './api'
import { routesPath } from './navigation/routesPath'

export const ProtectedRoutes = () => {
  const { authUser, setAuthUser, requestLoading } = useAuthStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    retry: 1,
    retryDelay: 2000,
    refetchInterval: authUser === null ? 2000 : false,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  if (requestLoading || isFetching) {
    return <Loading />
  }

  if (authUser === null && !isSuccess) {
    toast.error('Please connect to continue.')
    return <Navigate to={routesPath.base} />
  }

  if (authUser?.isVerified === false && !isSuccess) {
    toast.error('Please select a subscription to continue.')
    return <Navigate to={routesPath.base} />
  }

  return <Outlet />
}

export const ProtectedSimpleRoutes = () => {
  const { authUser, setAuthUser, requestLoading } = useAuthStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    retry: 1,
    retryDelay: 2000,
    refetchInterval: authUser === null ? 2000 : false,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  if (requestLoading || isFetching) {
    return <Loading />
  }

  if (authUser === null && !isSuccess) {
    toast.error('Please connect to continue.')
    return <Navigate to={routesPath.base} />
  }

  if (
    authUser?.isVerified === false &&
    window.location.pathname !== '/subscription' &&
    !isSuccess
  ) {
    toast.error('Please select a subscription to continue.')
    return <Navigate to={routesPath.subscription} />
  }

  return <Outlet />
}
