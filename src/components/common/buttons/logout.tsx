import { Button } from "@mui/joy"

import useAuthManager from "../../../hooks/useAuthManager"

export default function LogoutButton() {
  const authUser = useAuthManager()

  return (
    <Button
      color="primary"
      variant="soft"
      onClick={() => {
        authUser.redirectedLogout()
      }}
    >
      Se reconnecter
    </Button>
  )
}

interface ErrorButtonProps {
  error: Error
}

export function ErrorButton({ error }: ErrorButtonProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <h1>{error.message + `: ${error.name}}`}</h1>
      <LogoutButton />
    </div>
  )
}
