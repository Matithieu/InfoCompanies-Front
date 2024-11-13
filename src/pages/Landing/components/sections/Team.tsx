import GithubIcon from '@/components/icons/github-icon'
import LinkedInIcon from '@/components/icons/linkedin-icon'
import XIcon from '@/components/icons/x-icon'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@mui/joy'
interface TeamProps {
  imageUrl: string
  firstName: string
  lastName: string
  positions: string[]
  socialNetworks: SocialNetworkProps[]
}
interface SocialNetworkProps {
  name: string
  url: string
}

export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: '/test.webp',
      firstName: 'Mathieu',
      lastName: 'Yahia-Amar',
      positions: ['Creator Of This Website'],
      socialNetworks: [
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/mathieu-yahia-amar-070574234/',
        },
        {
          name: 'Github',
          url: 'https://github.com/Matithieu',
        },
      ],
    },
  ]

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case 'LinkedIn':
        return <LinkedInIcon />
      case 'Github':
        return <GithubIcon />
      case 'X':
        return <XIcon />
    }
  }

  return (
    <section className="container py-24 sm:py-32 lg:w-[75%]" id="team">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          Team
        </h2>

        <h2 className="text-center text-3xl font-bold md:text-4xl">
          The Company Dream Team
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index,
          ) => (
            <Card
              key={index}
              className="group/hoverimg flex h-full flex-col overflow-hidden bg-muted/60 dark:bg-card"
            >
              <CardHeader className="gap-0 p-0">
                <div className="h-full overflow-hidden">
                  <img
                    alt=""
                    className="aspect-square size-full w-full object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:scale-[1.01] group-hover/hoverimg:saturate-100"
                    height={300}
                    src={imageUrl}
                    width={300}
                  />
                </div>
                <CardTitle className="p-6 pb-4">
                  {firstName}
                  <span className="ml-2 text-primary">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${
                    index === positions.length - 1 && 'pb-6'
                  }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="mt-auto space-x-4">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    className="transition-all hover:opacity-80"
                    href={url}
                    target="_blank"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  )
}
