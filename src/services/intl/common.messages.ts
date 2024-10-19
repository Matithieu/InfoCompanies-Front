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
  firstName: {
    defaultMessage: 'Prénom',
    id: `${scope}.firstName`,
  },
  lastName: {
    defaultMessage: 'Nom',
    id: `${scope}.lastName`,
  },
  phone: {
    defaultMessage: 'Téléphone',
    id: `${scope}.phone`,
  },
  edit: {
    defaultMessage: 'Editer',
    id: `${scope}.edit`,
  },
  email: {
    defaultMessage: 'Email',
    id: `${scope}.email`,
  },
  save: {
    defaultMessage: 'Sauvegarder',
    id: `${scope}.save`,
  },
})
