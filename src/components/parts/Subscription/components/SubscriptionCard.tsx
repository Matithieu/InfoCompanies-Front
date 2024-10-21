import { Button, Card, CardActions, CardContent, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'

import { ItemData } from '../../../../data/Stripe/itemData'
import commonMessages from '../../../../services/intl/common.messages'
import { formatMessage } from '../../../../services/intl/intl'
import { stripeSubscription } from '../../../../utils/api/queries'

type SubscriptionCardProps = {
  item: ItemData
  disabled: boolean
  isFavorite?: boolean
  onCardClick: () => void
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  item,
  disabled,
  isFavorite,
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
        ...(isFavorite && {
          transform: 'scale(1.10)',
        }),
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
          variant="solid"
          onClick={handleClick}
        >
          {formatMessage(commonMessages.subscribe)}
        </Button>
      </CardActions>
    </Card>
  )
}

export default SubscriptionCard
