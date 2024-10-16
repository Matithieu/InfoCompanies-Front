import { defineMessages } from 'react-intl'

const scope = 'intl'

export default defineMessages({
  loading: {
    defaultMessage: 'Chargement...',
    id: `${scope}.loading`,
  },
  workInProgress: {
    defaultMessage: 'Work in progres !!',
    id: `${scope}.workInProgress`,
  },
})
