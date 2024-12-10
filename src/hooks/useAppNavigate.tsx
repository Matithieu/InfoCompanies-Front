import { useNavigate } from 'react-router'

import { routesPath } from '../containers/Router/routesPath'

export const useAppNavigate = () => {
  const navigate = useNavigate()

  // Generic navigation helper
  const navigateTo = (path: string, state?: Record<string, any>) => {
    navigate(path, state ? { state } : undefined)

    /**
     * When navigating to /ui#hash, scroll to the element with the id of hash
     * The hash can be #pricing, #faq, #testimonials...
     */
    if (path.includes('#')) {
      const [_, hash] = path.split('#')

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)

          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100) // Delay to ensure the DOM is updated
      }
    }
  }

  // Predefined navigation functions
  const navigation = {
    toHome: () => navigateTo(routesPath.base),
    toDashboard: () => navigateTo(routesPath.dashboard),
    toFavorites: () => navigateTo(routesPath.favorites),
    toSettings: () => navigateTo(routesPath.settings),
    toAccount: () => navigateTo(routesPath.account),
    toTerms: () => navigateTo(routesPath.terms),
    toPrivacy: () => navigateTo(routesPath.privacy),
    toLegal: () => navigateTo(routesPath.legal),
    toSearch: (searchTerm: string) =>
      navigateTo(`${routesPath.search}/${searchTerm}`, { searchTerm }),
    toCompany: (companyId: string) =>
      navigateTo(`${routesPath.company}/${companyId}`, { companyId }),
    toLeader: (leaderPath: string) =>
      navigateTo(`${routesPath.leader}/${leaderPath}`, { leaderPath }),
    toSubscription: () => navigateTo(routesPath.subscription),
    toFailure: () => navigateTo(routesPath.failure),
    toOrderConfirmation: () => navigateTo(routesPath.completion),
    toTest: () => navigateTo(routesPath.test),
    toErrorNotFound: () => navigateTo(routesPath.errorNotFound),
    toPage: (path: string, state?: Record<string, any>) =>
      navigateTo(path, state),
  }

  return { navigation }
}
