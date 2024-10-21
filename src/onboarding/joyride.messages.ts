import { defineMessages } from 'react-intl'

const scope = 'joyride'

export default defineMessages({
  step1Content: {
    defaultMessage:
      'Here is the dashboard, you can select a company by clicking on a row!',
    id: `${scope}.step1Content`,
  },
  step2Content: {
    defaultMessage: 'You can filter companies based on specific criteria.',
    id: `${scope}.step2Content`,
  },
  step3Content: {
    defaultMessage:
      'Click directly on a web link or an icon to access the company.',
    id: `${scope}.step3Content`,
  },
  step4Content: {
    defaultMessage: 'Add the company to "To Do" or "Done" to set it aside.',
    id: `${scope}.step4Content`,
  },
  back: {
    defaultMessage: 'Back',
    id: `${scope}.back`,
  },
  close: {
    defaultMessage: 'Close',
    id: `${scope}.close`,
  },
  last: {
    defaultMessage: 'Go!',
    id: `${scope}.last`,
  },
  next: {
    defaultMessage: 'Next',
    id: `${scope}.next`,
  },
  skip: {
    defaultMessage: 'Skip',
    id: `${scope}.skip`,
  },
})
