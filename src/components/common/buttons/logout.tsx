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
