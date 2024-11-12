import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string
  popular: PopularPlan
  price: number
  description: string
  buttonText: string
  benefitList: string[]
}

const plans: PlanProps[] = [
  {
    title: 'Free',
    popular: PopularPlan.NO,
    price: 0,
    description:
      'Testez notre plateforme gratuitement et découvrez nos outils !',
    buttonText: 'Start Free Trial',
    benefitList: ['15 requêtes/jour'],
  },
  {
    title: 'Premium',
    popular: PopularPlan.YES,
    price: 25,
    description: 'Poussez vos recherches plus loin !',
    buttonText: 'Get Started',
    benefitList: ['100 requêtes/jour'],
  },
  {
    title: 'Enterprise',
    popular: PopularPlan.NO,
    price: 35,
    description: "Prospectez à plusieurs et accédez à plus d'entreprises !",
    buttonText: 'Contact Us',
    benefitList: ['200 requêtes/jour'],
  },
]

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32" id="pricing">
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
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? 'border-[1.5px] border-primary shadow-black/10 drop-shadow-xl dark:shadow-white/10 lg:scale-110'
                  : ''
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
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
                  variant={
                    popular === PopularPlan?.YES ? 'default' : 'secondary'
                  }
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
