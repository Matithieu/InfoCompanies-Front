import { defineMessages } from 'react-intl'

const scope = 'pages.account'

export default defineMessages({
  welcomingMessage: {
    defaultMessage: 'Bievenue, {name}!',
    id: `${scope}.welcomingMessage`,
  },
  accountProfile: {
    defaultMessage: 'Profil',
    id: 'tabs.account',
  },
  invoices: {
    defaultMessage: '{itemCount, plural, one {Facture} other {Factures}}',
    id: 'intl.invoices',
  },
})
