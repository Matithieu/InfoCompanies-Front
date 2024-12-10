import useUserStore from '@/store/userStore'
import posthog, { PostHogConfig } from 'posthog-js'
import { PostHogProvider as PostHog } from 'posthog-js/react'
import { FC, ReactNode, useEffect } from 'react'

type PostHogProps = {
  children: ReactNode
}

const PostHogProvider: FC<PostHogProps> = ({ children }) => {
  const { user } = useUserStore()

  const options: Partial<PostHogConfig> = {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  }

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
      })
    }
  }, [user])

  // Avoid sending events in development
  if (window.location.host === 'localhost:5173') return <>{children}</>

  return (
    <PostHog
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      {children}
    </PostHog>
  )
}

export default PostHogProvider
