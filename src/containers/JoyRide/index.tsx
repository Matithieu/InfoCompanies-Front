import useToggle from '@/hooks/useToggle'
import { UseMutationResult } from '@tanstack/react-query'
import { FC } from 'react'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'

import { User } from '../../data/types/index.types'
import { formatMessage } from '../../services/intl/intl'
import { returnInverseOfBoolean } from '../../utils/utils'
import joyrideMessages from './joyride.messages'
import joyrideSteps from './joyrideSteps'

type JoyRideProps = {
  user: User | null
  onboardingMutation: UseMutationResult<void, Error, void, unknown>
  setUser: (user: Partial<User> | null) => void
}

const JoyRideOnboardingProvider: FC<JoyRideProps> = ({
  user,
  onboardingMutation,
  setUser,
}) => {
  const [isTourRunning, setIsTourRunning] = useToggle(
    returnInverseOfBoolean(!!user?.hasCompletedOnboarding),
  )

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setIsTourRunning(false)
      setUser({ ...user, hasCompletedOnboarding: true })
      onboardingMutation.mutate()
    }
  }

  return (
    <Joyride
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      locale={{
        back: formatMessage(joyrideMessages.back),
        close: formatMessage(joyrideMessages.close),
        last: formatMessage(joyrideMessages.last),
        next: formatMessage(joyrideMessages.next),
        skip: formatMessage(joyrideMessages.skip),
      }}
      run={isTourRunning}
      steps={joyrideSteps}
      styles={{
        options: {
          zIndex: 3000,
        },
      }}
    />
  )
}

export default JoyRideOnboardingProvider
