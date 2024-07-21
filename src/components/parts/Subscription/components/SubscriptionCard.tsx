import { Button, Card, CardActions, CardContent, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'

import { ItemData } from '../../../../data/Stripe/itemData'
import { stripeSubscription } from '../../../../utils/api'

type SubscriptionCardProps = {
  item: ItemData
  disabled: boolean
  onCardClick: () => void
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  item,
  disabled,
  onCardClick,
}) => {
  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['sub' + item.id],
    queryFn: () => stripeSubscription(item.id),
    enabled: false,
  })

  const handleClick = () => {
    onCardClick()
    refetch()
  }

  useEffect(() => {
    if (isSuccess && data) {
      window.open(data, '__blank')
    }
  }, [data, isSuccess])

  return (
    <Card
      sx={{
        wordBreak: 'break-word',
        width: '350px',
      }}
    >
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
        <Button
          color="primary"
          disabled={disabled}
          variant="soft"
          onClick={handleClick}
        >
          Subscribe
        </Button>
      </CardActions>
    </Card>
  )
}

export default SubscriptionCard
