import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import {
  AutocompleteByNameQueries,
  AutocompleteEndpointPlural,
  AutocompleteEndpointSingular,
  Contact,
  SearchParamsNonNullable,
} from '../../../types/index.types'
import { FiltersProps } from './Filters'

export const filterNamesMapping: {
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

export const filterToShowToFilterKeyMapping: {
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

export type AutocompleteFilterFields = Pick<
  SearchParamsNonNullable,
  'cityNames' | 'regionNames' | 'industrySectorNames' | 'legalFormNames'
>

// Singular
export const autocompleteSingularParamMapping: Record<
  keyof AutocompleteFilterFields,
  AutocompleteEndpointSingular
> = {
  cityNames: 'city',
  regionNames: 'region',
  industrySectorNames: 'industrySector',
  legalFormNames: 'legalForm',
}

export const autocompleteSingularResultMapping: Record<
  AutocompleteEndpointSingular,
  keyof AutocompleteByNameQueries
> = {
  city: 'query',
  region: 'query',
  industrySector: 'query',
  legalForm: 'query',
}

// Plural
export const autocompletePluralParamMapping: Record<
  keyof AutocompleteFilterFields,
  AutocompleteEndpointPlural
> = {
  cityNames: 'cities',
  regionNames: 'regions',
  industrySectorNames: 'industrySectors',
  legalFormNames: 'legalForms',
}

export const autocompletePluralResultMapping: Record<
  AutocompleteEndpointPlural,
  keyof AutocompleteByNameQueries
> = {
  cities: 'query',
  regions: 'query',
  industrySectors: 'query',
  legalForms: 'query',
}

export const contactFilterDescription: {
  [key in keyof NonNullable<Contact>]: string
} = {
  email: formatMessage(commonMessages.email),
  phoneNumber: formatMessage(commonMessages.phone),
  website: formatMessage(commonMessages.website),
}
