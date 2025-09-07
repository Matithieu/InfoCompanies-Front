import useToggle from '@/hooks/useToggle'
import useConfigurationStore from '@/stores/ConfigurationStore'
import { FC } from 'react'

import SubscriptionCard from './components/SubscriptionCard'

export enum PopularPlan {
  NO = 0,
  YES = 1,
}

export interface PlanProps {
  id: string
  title: string
  popular: PopularPlan
  price: number
  description: string
  buttonText: string
  benefitList: string[]
}

type PriceIds = {
  stripePriceIdFree: string
  stripePriceIdBasic: string
  stripePriceIdPremium: string
}

export const getPlans = ({
  stripePriceIdFree,
  stripePriceIdBasic,
  stripePriceIdPremium,
}: PriceIds): PlanProps[] => {
  return [
    {
      id: stripePriceIdFree,
      title: 'Free',
      popular: PopularPlan.NO,
      price: 0,
      description:
        'Testez notre plateforme gratuitement et découvrez nos outils !',
      buttonText: 'Essai gratuit',
      benefitList: ['15 requêtes/jour'],
    },
    {
      id: stripePriceIdBasic,
      title: 'Premium',
      popular: PopularPlan.YES,
      price: 25,
      description: 'Poussez vos recherches plus loin !',
      buttonText: "Let's go !",
      benefitList: ['100 requêtes/jour'],
    },
    {
      id: stripePriceIdPremium,
      title: 'Enterprise',
      popular: PopularPlan.NO,
      price: 35,
      description: "Prospectez à plusieurs et accédez à plus d'entreprises !",
      buttonText: 'En avant !',
      benefitList: ['200 requêtes/jour'],
    },
  ]
}

// const plans: PlanProps[] =

export const PricingSection: FC = () => {
  const [buttonClicked, setButtonClicked] = useToggle()
  const { configuration } = useConfigurationStore()

  const handleCardClick = () => {
    setButtonClicked(true)
  }

  const plans = getPlans({
    stripePriceIdFree: configuration?.stripePriceIdFree ?? '',
    stripePriceIdBasic: configuration?.stripePriceIdBasic ?? '',
    stripePriceIdPremium: configuration?.stripePriceIdPremium ?? '',
  })

  return (
    <section className="container py-12 sm:py-16" id="pricing">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
        Pricing
      </h2>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Choisissez votre offre
      </h2>

      <h3 className="mx-auto pb-14 text-center text-xl text-muted-foreground md:w-1/2">
        Trois offres différentes, adaptées à vos besoins et à votre budget
      </h3>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            isDisabled={buttonClicked}
            subscriptionItem={plan}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  )
}
