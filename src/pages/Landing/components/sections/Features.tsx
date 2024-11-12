import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import { icons } from 'lucide-react'

interface FeaturesProps {
  icon: keyof typeof icons
  title: string
  description: string
}

const featureList: FeaturesProps[] = [
  {
    icon: 'Map',
    title: 'Recherche Géographique',
    description:
      'Explorez les entreprises par localisation pour trouver les partenaires idéaux dans la région de votre choix.',
  },
  {
    icon: 'ClipboardList',
    title: 'Base de Données Complète',
    description:
      'Accédez à une base de données exhaustive pour découvrir de nouvelles opportunités d’affaires.',
  },
  {
    icon: 'SlidersVertical',
    title: 'Filtres Personnalisables',
    description:
      'Utilisez des filtres puissants pour affiner votre recherche et obtenir des résultats précis et adaptés.',
  },
  {
    icon: 'ChartBar',
    title: 'Chiffres Clés',
    description:
      'Consultez les chiffres clés des entreprises pour prendre des décisions éclairées et optimiser vos projets.',
  },
  {
    icon: 'UserPlus',
    title: 'Connexions Facilitée',
    description:
      "Découvrez les details de l'entreprise tels que les noms des dirigeants, leur poste et bien plus.",
  },
  {
    icon: 'Search',
    title: 'Recherche Rapide et Efficace',
    description:
      'Obtenez les résultats en un clin d’œil grâce à un moteur de recherche optimisé et performant.',
  },
]

export const FeaturesSection = () => {
  return (
    <section className="container py-24 sm:py-32" id="features">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
        Fonctionnalités
      </h2>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Ce qui nous différencie
      </h2>

      <h3 className="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2">
        Découvrez une plateforme pensée pour simplifier votre accès aux
        informations d&apos;entreprises. Notre outil est conçu pour répondre
        précisément à vos besoins professionnels.
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full border-0 bg-background shadow-none">
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
                  <Icon
                    className="text-primary"
                    color="hsl(var(--primary))"
                    name={icon as keyof typeof icons}
                    size={24}
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
