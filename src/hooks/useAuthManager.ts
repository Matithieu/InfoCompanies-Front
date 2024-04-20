import { useAuth } from "react-oidc-context"

export default function useAuthManager() {
  const auth = useAuth()

  return {
    redirectedLogin: () => auth.signinRedirect(),
    silentLogin: () => auth.signinSilent(),

    redirectedLogout: () => auth.signoutRedirect(),
    silentLogout: () => auth.signoutSilent(),

    isLoading: () => auth.isLoading,
    isAuthenticated: () => auth.isAuthenticated,
    getAccessToken: () => auth.user?.access_token,
    getUser: () => auth.user,
  }
}
