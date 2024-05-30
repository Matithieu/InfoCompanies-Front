import { toast } from 'react-toastify'
import { LoginButton, SelectSubscriptionButton } from '../buttons/AuthButtons'

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
