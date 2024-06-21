import React from 'react'

import { Products } from '../../data/Stripe/subscription'
import SubscriptionCard from './components/SubscriptionCard'

const Subscription: React.FC = () => {
  const subscriptions = Products.sort((a, b) => a.price - b.price)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
      }}
    >
      {subscriptions.map((option, index) => (
        <SubscriptionCard key={index} {...option} />
      ))}
    </div>
  )
}

export default Subscription
