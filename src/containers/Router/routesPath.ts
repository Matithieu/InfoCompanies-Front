export type RoutesPath = Record<string, string>

// Centralized route paths
export const routesPath: RoutesPath = {
  base: '/ui',
  dashboard: '/ui/dashboard',
  favorites: '/ui/favorites',
  settings: '/ui/settings',
  account: '/ui/account',
  search: '/ui/search',
  company: '/ui/company',
  leader: '/ui/leader',
  subscription: '/ui#pricing',
  payment: '/ui/stripe',
  failure: '/ui/failure',
  completion: '/ui/completion',
  test: '/ui/test',
  loading: '/ui/loading',
  errorNotFound: '/ui/error/not-found',
  terms: '/ui/terms',
  privacy: '/ui/privacy',
  legal: '/ui/legal',
}
