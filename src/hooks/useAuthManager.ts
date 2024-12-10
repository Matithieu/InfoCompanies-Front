/**
 * Provides signIn and signOut functions to handle OAuth login and logout.
 */
export default function useAuthManager() {
  const loginUrl = import.meta.env.VITE_OAUTH_SIGNIN_URL
  const logoutURL = import.meta.env.VITE_OAUTH_SIGNOUT_URL
  const loginRedirectUrl = import.meta.env.VITE_OAUTH_SIGNIN_REDIRECT_URL
  const logoutRedirectUrl = import.meta.env.VITE_OAUTH_SIGNOUT_REDIRECT_URL

  return {
    signIn: () => {
      const signInUrl = new URL(loginUrl)
      signInUrl.searchParams.set('rd', loginRedirectUrl)
      window.location.href = signInUrl.toString()
    },
    signOut: () => {
      const signOutUrl = new URL(logoutURL)
      signOutUrl.searchParams.set('rd', logoutRedirectUrl)
      window.location.href = signOutUrl.toString()
    },
  }
}
