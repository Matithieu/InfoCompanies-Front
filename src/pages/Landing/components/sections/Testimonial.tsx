import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Star } from 'lucide-react'

interface ReviewProps {
  image: string
  name: string
  userName: string
  comment: string
  rating: number
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://github.com/shadcn.png',
    name: 'Julie Martin',
    userName: 'Business Analyst',
    comment:
      "La plateforme m’a permis de trouver rapidement des informations précises sur les entreprises et leurs secteurs d'activité. Un gain de temps incroyable!",
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Marc Dupont',
    userName: 'Responsable Commercial',
    comment:
      'J’apprécie énormément les filtres avancés de recherche. Trouver les entreprises ciblées est devenu un jeu d’enfant.',
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Laura Fernandez',
    userName: 'Consultante en stratégie',
    comment:
      'Une base de données complète et facile d’accès ! Les détails sur les dirigeants sont un vrai plus pour mes analyses.',
    rating: 4.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Pierre Lemaitre',
    userName: 'Entrepreneur',
    comment:
      'Grâce à cette application, j’ai pu identifier rapidement des partenaires potentiels pour développer mon réseau.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Sophie Durand',
    userName: 'Marketing Specialist',
    comment:
      'Les insights fournis par cette plateforme sont extrêmement précieux pour nos campagnes marketing. Une ressource incontournable!',
    rating: 4.7,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Lucas Lefevre',
    userName: 'Directeur de projets',
    comment:
      'L’analyse des chiffres clés est un vrai atout pour notre stratégie. Une application intuitive et bien pensée.',
    rating: 4,
  },
]

export const TestimonialSection = () => {
  return (
    <section className="container py-12 sm:py-16" id="testimonials">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          Témoignages
        </h2>

        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Ce que nos clients en disent
        </h2>
      </div>

      <Carousel
        className="relative mx-auto w-4/5 sm:w-[90%] lg:max-w-screen-xl"
        opts={{
          align: 'start',
        }}
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pb-0 pt-6">
                  <div className="flex gap-1 pb-6">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index < review.rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        alt="radix"
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
