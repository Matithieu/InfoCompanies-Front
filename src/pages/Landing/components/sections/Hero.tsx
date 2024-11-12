import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <Badge className="py-2 text-sm" variant="outline">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> 4 millions d&apos;entreprises ! </span>
          </Badge>

          <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
            <h1>
              Prospectez sans
              <span className="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-2 text-transparent">
                effort
              </span>
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            Téléphone, e-mail, réseaux sociaux, chiffre d’affaires, dirigeants,
            effectif en un clic
          </p>

          <div className="space-y-4 md:space-x-4 md:space-y-0">
            <Button className="group/arrow w-5/6 font-bold md:w-1/4">
              Let&apos;s go !
              <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
