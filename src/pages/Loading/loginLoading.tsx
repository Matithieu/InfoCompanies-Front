import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import useAuthStore from "../../store/authStore"
import { fetchUser } from "../../utils/api"

import Loading from "."

export default function FakeLoading() {
  const { setAuthUser } = useAuthStore()
  const navigate = useNavigate()

  const { isError, data, error } = useQuery({
    queryKey: ["user query"],
    queryFn: () => fetchUser(),
    retry: 1,
    retryDelay: 2000,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  })

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setAuthUser(data)
      navigate("/dashboard")
    } else {
      console.error("No data")
      // print a error page
    }
  }, [data, setAuthUser, navigate])

  if (isError) {
    return (
      <>
        <div>
          <h1>Failed to fetch user data</h1>
          <p>{error.message}</p>
        </div>
      </>
    )
  }

  return <Loading />
}
