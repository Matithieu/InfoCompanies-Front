import { ny } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, XIcon } from 'lucide-react'
import { useState } from 'react'

type AnimationStyle =
  | "'from-bottom'"
  | "'from-center'"
  | "'from-top'"
  | "'from-left'"
  | "'from-right'"
  | "'fade'"
  | "'top-in-bottom-out'"
  | "'left-in-right-out'"

interface HeroVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const animationVariants = {
  "'from-bottom'": {
    initial: { y: "'100%'", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "'100%'", opacity: 0 },
  },
  "'from-center'": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "'from-top'": {
    initial: { y: "'-100%'", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "'-100%'", opacity: 0 },
  },
  "'from-left'": {
    initial: { x: "'-100%'", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "'-100%'", opacity: 0 },
  },
  "'from-right'": {
    initial: { x: "'100%'", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "'100%'", opacity: 0 },
  },
  "'fade'": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "'top-in-bottom-out'": {
    initial: { y: "'-100%'", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "'100%'", opacity: 0 },
  },
  "'left-in-right-out'": {
    initial: { x: "'-100%'", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "'100%'", opacity: 0 },
  },
}

export default function HeroVideoDialog({
  animationStyle = "'from-center'",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "'Video thumbnail'",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const selectedAnimation = animationVariants[animationStyle]

  return (
    <div className={ny("'relative'", className)}>
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsVideoOpen(true)}
      >
        <img
          alt={thumbnailAlt}
          className="w-full rounded-md border border-stone-200 shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8] dark:border-stone-800"
          height={1080}
          src={thumbnailSrc}
          width={1920}
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="flex size-28 items-center justify-center rounded-full bg-stone-900/10 backdrop-blur-md dark:bg-stone-50/10">
            <div className="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "'drop-shadow(0 4px 3px rgb(0 0 / 0.07)) drop-shadow(0 2px 0.06))'",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              {...selectedAnimation}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              transition={{ type: "'spring'", damping: 30, stiffness: 300 }}
            >
              <motion.button className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black">
                <XIcon className="size-5" />
              </motion.button>
              <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="size-full rounded-2xl"
                  src={videoSrc}
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
