import { SocialMedia } from '../../../data/types/company'
import { EmployeeFilter } from '../../../data/types/index.types'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { Contact } from './components/ContactFilter'

import { FiltersProps } from '.'

export const filterDisplayNames: {
  [key in FiltersProps['filtersToShow'][number]]: string
} = {
  city: formatMessage(commonMessages.city),
  region: formatMessage(commonMessages.region),
  industrySector: formatMessage(commonMessages.industrySector),
  legalForm: formatMessage(commonMessages.legalForm),
  employee: formatMessage(commonMessages.employeeNumber),
  socials: formatMessage(commonMessages.socials),
  contact: formatMessage(commonMessages.contact),
  isCompanySeen: formatMessage(commonMessages.isCompanySeen),
  searchButton: formatMessage(commonMessages.search), // Not needed because not in the dropdown
}

export type SelectedFilterType =
  | string[]
  | unknown[]
  | EmployeeFilter
  | Array<keyof SocialMedia>
  | Array<keyof Contact>
  | boolean

export const contactFilterDescription: {
  [key in keyof Contact]: string
} = {
  email: formatMessage(commonMessages.email),
  phone: formatMessage(commonMessages.phone),
  website: formatMessage(commonMessages.website),
}
