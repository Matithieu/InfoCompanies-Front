import { Button, Card, CardActions, CardContent, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ItemData } from '../../../data/Stripe/itemData'
import { stripeSubscription } from '../../../utils/api'

export default function SubscriptionCard(item: ItemData) {
  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['sub'], // Include authUser in the queryKey
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
