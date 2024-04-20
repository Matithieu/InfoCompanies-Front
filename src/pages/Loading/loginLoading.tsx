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
    refetchOnWindowFocus: false,
  })

  if (data !== null && data !== undefined) {
    console.log("Data fetched")
    setAuthUser(data)
    navigate("/dashboard")
  } else {
    console.log("No data")
  }

  if (isError) {
    return (
      <div>
        <h1>Failed to fetch user data</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return <Loading />
}
