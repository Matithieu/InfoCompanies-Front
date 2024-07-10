import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ItemData } from '../../data/Stripe/itemData.ts'
import { User } from '../../data/types/user.ts'
import useAuthStore from '../../store/authStore.tsx'
import Loading from '../Loading/index.tsx'

const fetchSubscription = async (itemData: ItemData, user: User) => {
  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL + '/subscriptions/trial',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: itemData.id,
        customerName: user?.lastName,
        customerEmail: user?.email,
        subscriptionId: '',
      }),
    },
  )

  return response.text()
}

// Make this a functional component that takes in the item data as a prop
function Payment() {
  const location = useLocation()

  const itemData = (location.state as any)?.item as ItemData

  const { authUser } = useAuthStore()

  //const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));
  const [loading, setLoading] = useState(true) // New loading state

  /**
   * Check if the user is verified when the component is mounted
   * and redirect to the previous page if the user is verified
   */
  useEffect(() => {
    if (authUser) {
      if (authUser.isVerified) {
        window.history.back()
      } else {
        setLoading(false) // Set loading to false if user is not verified
      }
    }
  }, [authUser])

  /*
  useEffect(() => {
    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || ""));
  }, []);
  */

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['subcription', itemData, authUser],
    queryFn: () => {
      if (authUser) {
        return fetchSubscription(itemData, authUser)
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  if (loading || isPending) return <Loading />

  if (isSuccess && data) window.location.replace(data)

  if (isError) return <div>{error.message}</div>

  return <Loading />
}

export default Payment
