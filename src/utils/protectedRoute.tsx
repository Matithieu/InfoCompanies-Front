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
import useCompaniesSeenStore from '../store/companySeenStore'
import { fetchCompanySeen, fetchUser } from './api'
import { isNotNU } from './assertion.util'
import { routesPath } from './navigation/routesPath'

export const ProtectedRoutes = () => {
  const { authUser, setAuthUser, requestLoading } = useAuthStore()
  const { setCompaniesSeen } = useCompaniesSeenStore()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    retry: 0,
    refetchOnWindowFocus: true,
  })

  const { data: companiesSeenData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => fetchCompanySeen(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (isNotNU(data) && companiesSeenData) {
      setAuthUser(data)
      setCompaniesSeen(companiesSeenData)
    }
  }, [data, setAuthUser, companiesSeenData, setCompaniesSeen])

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
  const { setCompaniesSeen } = useCompaniesSeenStore()
  const urlLocation = window.location.pathname

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['user query', authUser],
    queryFn: () => (authUser === null ? fetchUser() : Promise.resolve(null)),
    retry: 0,
    refetchOnWindowFocus: true,
  })

  const { data: companiesSeenData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => fetchCompanySeen(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (isNotNU(data) && companiesSeenData) {
      setAuthUser(data)
      setCompaniesSeen(companiesSeenData)
    }
  }, [data, setAuthUser, companiesSeenData, setCompaniesSeen])

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
