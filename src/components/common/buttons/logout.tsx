import { Button } from "@mui/joy"
import useAuthManager from "../../../hooks/useAuthManager"

export default function LogoutButton() {
  const authUser = useAuthManager()

  return (
    <Button
      variant="soft"
      color="primary"
      onClick={() => {
        authUser.redirectedLogout()
      }}
    >
      Se reconnecter
    </Button>
  )
}
