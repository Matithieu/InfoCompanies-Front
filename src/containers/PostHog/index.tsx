import useAuthStore from '@/store/authStore'
import posthog, { PostHogConfig } from 'posthog-js'
import { PostHogProvider as PostHog } from 'posthog-js/react'
import { FC, ReactNode, useEffect } from 'react'

type PostHogProps = {
  children: ReactNode
}

const PostHogProvider: FC<PostHogProps> = ({ children }) => {
  const { authUser } = useAuthStore()

  const options: Partial<PostHogConfig> = {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  }

  useEffect(() => {
    if (authUser) {
      posthog.identify(authUser.id)
    }
  }, [authUser])

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
