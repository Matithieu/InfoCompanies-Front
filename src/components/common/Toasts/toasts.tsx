import { toast } from 'react-toastify'
import {
  LoginButton,
  QuotaExceededButton,
  SelectSubscriptionButton,
} from '../buttons/AuthButtons'

export function toastErrorConnect() {
  return toast.error(<LoginButton message="Please connect to continue." />)
}

export function toastErrorReconnect() {
  return toast.error(<LoginButton message="Please reconnect to continue." />)
}

export function toastWarnSelectSubscription() {
  return toast.warn(
    <SelectSubscriptionButton message="Please select a subscription to continue." />,
  )
}

export function toastSuccessAlreadySubscribed() {
  return toast.success("You're already subscribed!")
}

export function toastErrorQuotaExceeded() {
  return toast.error(
    <QuotaExceededButton
      message="
          Quota dépassé! Changez de plan pour continuer ou veuillez attendre la
          fin du mois."
    />,
  )
}
