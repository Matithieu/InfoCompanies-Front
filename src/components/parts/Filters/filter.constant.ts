import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import {
  AutocompleteEndpoint,
  Contact,
  SearchParamsNonNullable,
} from '../../../types/index.types'
import { AutocompleteFilterFields } from './filter.type'
import { FiltersProps } from './Filters'

export const mapFilterNames: {
  [key in FiltersProps['filtersToShow'][number]]: string
} = {
  cityNames: formatMessage(commonMessages.city),
  regionNames: formatMessage(commonMessages.region),
  industrySectorNames: formatMessage(commonMessages.industrySector),
  legalFormNames: formatMessage(commonMessages.legalForm),
  numberOfEmployeeFilter: formatMessage(commonMessages.employeeNumber),
  socials: formatMessage(commonMessages.socials),
  contacts: formatMessage(commonMessages.contact),
  isCompanySeen: formatMessage(commonMessages.isCompanySeen),
}

export const mapFilterToShowToFilterKey: {
  [key in FiltersProps['filtersToShow'][number]]: keyof SearchParamsNonNullable
} = {
  cityNames: 'cityNames',
  regionNames: 'regionNames',
  industrySectorNames: 'industrySectorNames',
  legalFormNames: 'legalFormNames',
  numberOfEmployeeFilter: 'numberOfEmployeeFilter',
  socials: 'socials',
  contacts: 'contacts',
  isCompanySeen: 'isCompanySeen',
}

// Plural
export const mapAutocompleteParamsToEndpoints: Record<
  keyof AutocompleteFilterFields,
  AutocompleteEndpoint
> = {
  cityNames: 'cities',
  regionNames: 'regions',
  industrySectorNames: 'industry-sectors',
  legalFormNames: 'legal-forms',
}

export const mapContactFilterDescriptionToTexts: {
  [key in keyof NonNullable<Contact>]: string
} = {
  email: formatMessage(commonMessages.email),
  phoneNumber: formatMessage(commonMessages.phone),
  website: formatMessage(commonMessages.website),
}
