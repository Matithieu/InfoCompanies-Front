import { User } from "oidc-client-ts"

export function getUser() {
  const authority = import.meta.env.VITE_KEYCLOAK_AUTHORITY
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID

  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${authority}:${clientId}`
  )
  if (!oidcStorage) {
    localStorage.removeItem("authUser")
    return null
  }

  return User.fromStorageString(oidcStorage)
}
