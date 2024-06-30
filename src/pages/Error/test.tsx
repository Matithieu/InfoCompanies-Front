import { Button, Card, CardActions, CardContent, Typography } from '@mui/joy'
import React, { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { ItemData } from '../../data/Stripe/itemData'
import { Products } from '../../data/Stripe/subscription'
import { stripeSubscription } from '../../utils/api'

function SubscriptionOption(item: ItemData) {
  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['sub' + item.id], // Include authUser in the queryKey
    queryFn: () => stripeSubscription(item.id),
    enabled: false,
  })

  const handleClick = () => {
    refetch()
  }

  // Overkill for a onSuccess replacement
  useEffect(() => {
    if (isSuccess && data) {
      window.open(data, '__blank')
    }
  }, [data, isSuccess])

  return (
    <Card>
      <CardContent>
        <Typography level="h3">{item.name}</Typography>
        <Typography level="h4">{item.price} €</Typography>
        <ul>
          <li>
            <Typography level="body-lg">{item.description}</Typography>
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <Button color="primary" variant="soft" onClick={handleClick}>
          Subscribe
        </Button>
      </CardActions>
    </Card>
  )
}

const Subscription: React.FC = () => {
  const subscriptions = Products.sort((a, b) => a.price - b.price)
  // Ajoutez d'autres options ici
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
      }}
    >
      {subscriptions.map((option, index) => (
        <SubscriptionOption key={index} {...option} />
      ))}
    </div>
  )
}

export default Subscription
