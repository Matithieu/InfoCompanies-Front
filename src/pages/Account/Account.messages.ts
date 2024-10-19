import { defineMessages } from 'react-intl'

const scope = 'pages.account'

export default defineMessages({
  welcome: {
    defaultMessage: 'Bievenue, {name}!',
    id: `${scope}.welcome`,
  },
  accountProfile: {
    defaultMessage: 'Profil',
    id: 'tabs.account',
  },
  invoices: {
    defaultMessage: '{itemCount, plural, one {Facture} other {Factures}}',
    id: 'intl.invoices',
  },
  accountDetails: {
    defaultMessage: 'Détails du compte',
    id: `${scope}.accountDetails`,
  },
})
