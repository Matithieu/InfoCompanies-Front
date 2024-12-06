import { Card } from '@/components/ui/card'
import { FC } from 'react'

const Tutorial: FC = () => {
  return (
    <section className="container py-12 sm:py-16">
      <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
        Tutoriel
      </h2>

      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Découvrez l&apos;application
      </h2>

      <div
        aria-label="Video Tutorial Section"
        className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12"
        id="tutorial"
      >
        <Card className="rounded-lg border border-gray-200 shadow-2xl">
          <iframe
            allowFullScreen
            allow="autoplay; picture-in-picture;"
            className="h-64 w-full rounded-lg shadow-lg sm:h-80 md:h-[450px] md:w-[700px] lg:h-[600px] lg:w-[900px]"
            loading="lazy"
            src="https://www.youtube.com/embed/8pqasjyDkKc"
            title="Video Tutorial"
          />
        </Card>
      </div>
    </section>
  )
}

export default Tutorial
