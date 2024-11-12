import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { icons } from 'lucide-react'

interface BenefitsProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const benefitList: BenefitsProps[] = [
  {
    icon: 'Search',
    title: 'Accès Rapide aux Entreprises',
    description:
      'Accédez instantanément à un répertoire de plus de 4 millions d’entreprises, organisées pour une recherche simple et efficace.',
  },
  {
    icon: 'Filter',
    title: 'Filtres de Recherche Avancés',
    description:
      'Affinez vos résultats par ville, taille, secteur d’activité, et bien plus, pour une recherche ciblée et adaptée à vos besoins.',
  },
  {
    icon: 'TrendingUp',
    title: 'Optimisez Vos Opportunités',
    description:
      'Trouvez les meilleures entreprises pour vos projets et opportunités professionnelles, et établissez des connexions précieuses.',
  },
  {
    icon: 'MapPin',
    title: 'Explorer de Nouvelles Régions',
    description:
      'Développez votre réseau géographique et découvrez des entreprises dans des régions et secteurs que vous n’aviez pas envisagés.',
  },
]

export const BenefitsSection = () => {
  return (
    <section className="container py-24 sm:py-32" id="benefits">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-2 text-lg tracking-wider text-primary">Benefits</h2>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ne perdez pas plus de temps
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Parcourez plus de 4 millions d&apos;entreprises Françaises.
            <br />
            <br />
            Filtrez vos recherches avec des filtres puissants:
            <br />
            ville, effectif, secteur d&apos;activité et bien plus encore.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    className="mb-6 text-primary"
                    color="hsl(var(--primary))"
                    name={icon as keyof typeof icons}
                    size={32}
                  />
                  <span className="text-5xl font-medium text-muted-foreground/15 transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
