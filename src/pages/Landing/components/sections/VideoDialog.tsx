import HeroVideoDialog from '@/components/ui/hero-video-dialog'

export function DemoVideo() {
  return (
    <section className="container py-24 sm:py-32" id="video">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Démonstration
        </h2>
      </div>
      <HeroVideoDialog
        animationStyle="from-center"
        className="block dark:hidden"
        thumbnailAlt="Hero Video"
        thumbnailSrc="/videos/step-1.gif"
        videoSrc="https://www.youtube.com/embed/aPmyoZe3xDE"
      />
      <HeroVideoDialog
        animationStyle="from-center"
        className="hidden dark:block"
        thumbnailAlt="Hero Video"
        thumbnailSrc="/videos/step-1.gif"
        videoSrc="https://www.youtube.com/embed/aPmyoZe3xDE"
      />
    </section>
  )
}
