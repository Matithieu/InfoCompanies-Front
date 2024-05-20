export default function Test() {

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:8080/keycloak/users`, {
      method: "GET",
      headers: {
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
