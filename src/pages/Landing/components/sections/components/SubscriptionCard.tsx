import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import useAuthManager from '@/hooks/useAuthManager'
import useAuthStore from '@/store/authStore'
import { startStripeSubscription } from '@/utils/api/queries'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { FC, useEffect } from 'react'

import { PlanProps, PopularPlan } from '../Pricing'
type SubscriptionCardProps = {
  subscriptionItem: PlanProps
  isDisabled: boolean
  onCardClick: () => void
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscriptionItem: item,
  isDisabled,
  onCardClick,
}) => {
  const { authUser } = useAuthStore()
  const { signIn } = useAuthManager()

  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['sub' + item.id],
    queryFn: () => startStripeSubscription(item.id),
    enabled: false,
  })

  const handleClick = () => {
    if (authUser) {
      onCardClick()
      refetch()
    } else {
      signIn()
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      window.open(data, '__blank')
    }
  }, [data, isSuccess])

  return (
    <Card
      key={item.title}
      className={
        item.popular === PopularPlan?.YES
          ? 'border-[1.5px] border-primary shadow-black/10 drop-shadow-xl dark:shadow-white/10 lg:scale-110'
          : ''
      }
    >
      <CardHeader>
        <CardTitle className="pb-2">{item.title}</CardTitle>

        <CardDescription className="pb-4">{item.description}</CardDescription>

        <div>
          <span className="text-3xl font-bold">${item.price}</span>
          <span className="text-muted-foreground"> / jour</span>
        </div>
      </CardHeader>

      <CardContent className="flex">
        <div className="space-y-4">
          {item.benefitList.map((benefit) => (
            <span key={benefit} className="flex">
              <Check className="mr-2 text-primary" />
              <h3>{benefit}</h3>
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={isDisabled}
          variant={item.popular === PopularPlan?.YES ? 'default' : 'secondary'}
          onClick={handleClick}
        >
          {item.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SubscriptionCard
