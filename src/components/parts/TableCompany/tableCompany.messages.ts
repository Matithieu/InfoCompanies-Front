import { defineMessages } from 'react-intl'

const scope = 'page.dashboard.table'

export default defineMessages({
  copyToClipboard: {
    defaultMessage: 'Copied !',
    id: `${scope}.copyToClipboard`,
  },
  clickToCopyToClipboard: {
    defaultMessage: 'Click to copy !',
    id: `${scope}.clickToCopyToClipboard`,
  },
  clickToOpenInNewTab: {
    defaultMessage: 'Click to open !',
    id: `${scope}.clickToOpenInNewTab`,
  },
})
