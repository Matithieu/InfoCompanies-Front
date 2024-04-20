import { useAuth } from "react-oidc-context"

export default function Test() {
  const auth = useAuth()
  const token = auth.user?.access_token
  console.log(token)
  console.log(auth.user)

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:8080/keycloak/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const json = await response.json()
    console.log(json)
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={fetchUser}>Fetch user</button>
    </div>
  )
}
