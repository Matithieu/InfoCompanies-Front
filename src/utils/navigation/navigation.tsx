import { useNavigate } from 'react-router-dom'

import { ItemData } from '../../data/Stripe/itemData'
import { RoutesPath } from './routesPath'

// Assuming the component using this hook is wrapped in a <Router> component
export const useAppNavigate = () => {
  const navigate = useNavigate()

  // Simplified navigation functions
  const toHome = () => navigate('/ui')
  const toDashboard = () => navigate('/ui/dashboard')
  const toTerms = () => navigate('/ui/terms')
  const toPrivacy = () => navigate('/ui/privacy')
  const toLegal = () => navigate('/ui/legal')
  const toFavorites = () => navigate('/ui/favorites')
  const toSettings = () => navigate('/ui/settings')
  const toAccount = () => navigate('/ui/account')
  const toSearch = (searchTerm: string) =>
    navigate(`/ui/search/${searchTerm}`, { state: { searchTerm } })
  const toCompany = (companyId: string) =>
    navigate(`/ui/company/${companyId}`, { state: { companyId } })
  const toLeader = (leaderPath: string) =>
    navigate(`/ui/leaders/${leaderPath}`, { state: { leaderPath } })
  const toSubscription = () => navigate('/ui/subscription')
  const toPayment = (item: ItemData, endpoint: string) =>
    navigate('/ui/stripe', { state: { item, endpoint } })
  const toFailure = () => navigate('/ui/failure')
  const toOrderConfirmation = () => navigate('/ui/completion')
  const toTest = () => navigate('/ui/test')
  const toErrorNotFound = () => navigate('/ui/error/not-found')
  const toPage = (path: RoutesPath) => navigate(path)

  return {
    navigation: {
      toHome,
      toDashboard,
      toTerms,
      toPrivacy,
      toLegal,
      toFavorites,
      toSettings,
      toAccount,
      toSearch,
      toCompany,
      toLeader,
      toSubscription,
      toPayment,
      toFailure,
      toOrderConfirmation,
      toTest,
      toErrorNotFound,
      toPage,
    },
  }
}
