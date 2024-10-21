import { Step } from 'react-joyride'

import { formatMessage } from '../services/intl/intl'
import joyrideMessages from './joyride.messages'

const joyrideSteps: Array<Step> = [
  {
    target: '#joyride-step-1',
    content: formatMessage(joyrideMessages.step1Content),
  },
  {
    target: '#joyride-step-2',
    content: formatMessage(joyrideMessages.step2Content),
    placement: 'bottom',
  },
  {
    target: '#joyride-step-3',
    content: formatMessage(joyrideMessages.step3Content),
  },
  {
    target: '#joyride-step-4',
    content: formatMessage(joyrideMessages.step4Content),
  },
]

export default joyrideSteps
