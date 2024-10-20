import { toast } from 'react-toastify'

import {
  LoginButton,
  QuotaExceededButton,
  SelectSubscriptionButton,
} from '../Buttons/AuthButtons'

export function toastErrorConnect() {
  return toast.error(
    <LoginButton message="Veuillez vous connecter pour continuer." />,
  )
}

export function toastErrorReconnect(text?: string) {
  return toast.error(
    <>
      <LoginButton message="Veuillez vous reconnecter pour continuer." />
      {text}
    </>,
  )
}

export function toastWarnSelectSubscription() {
  return toast.warn(
    <SelectSubscriptionButton message="Veuillez sélectionner un abonnement pour continuer." />,
  )
}

export function toastSuccessAlreadySubscribed() {
  return toast.success(
    'Vous êtes déjà abonné ! Effacez vos cookies pour changer de compte.',
  )
}

export function toastErrorQuotaExceeded() {
  return toast.error(
    <QuotaExceededButton
      message="
          Quota dépassé ! Changez de plan pour continuer ou veuillez attendre demain."
    />,
  )
}
