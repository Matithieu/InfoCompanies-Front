import { components, operations } from './codegen/api'

export const RANDOM_UNSEEN_ENDPOINT = 'random-unseen'
export const LANDING_FILTER_ENDPOINT = 'landing-filter'

export type AutoCompleteItem = {
  id: number
  name: string
}

// Autocomplete
// Full endpoint without /ids
// Base type (singular ↔ plural mapping)
type AutocompleteEndpointMap = {
  city: 'cities'
  industrySector: 'industrySectors'
  legalForm: 'legalForms'
  region: 'regions'
}

// Singular endpoints
export type AutocompleteEndpointSingular = keyof AutocompleteEndpointMap

// Plural endpoints
export type AutocompleteEndpointPlural =
  AutocompleteEndpointMap[AutocompleteEndpointSingular]

// Both
export type AutocompleteEndpoint =
  | AutocompleteEndpointSingular
  | AutocompleteEndpointPlural

export type AutocompleteByIdsQueries = operations[
  | 'autocompleteCitiesByIds'
  | 'autocompleteIndustrySectorsByIds'
  | 'autocompleteLegalFormsByIds'
  | 'autocompleteRegionsByIds']['parameters']['query']

export type AutocompleteByNameQueries = operations[
  | 'autocompleteRegionsByName'
  | 'autocompleteIndustrySectorsByName'
  | 'autocompleteLegalFormsByName'
  | 'autocompleteRegionsByName']['parameters']['query']

export type AutocompleteByNamesQueries = operations[
  | 'autocompleteRegionsByNames'
  | 'autocompleteIndustrySectorsByNames'
  | 'autocompleteLegalFormsByNames'
  | 'autocompleteRegionsByNames']['parameters']['query']

// Filters

export type SearchParams = NonNullable<
  operations['getCompaniesByFilters']['requestBody']
>['content']['application/json']

export type SearchParamsNonNullable = Omit<
  NonNullable<SearchParams>,
  'page' | 'size'
>
export type SearchParamsNullableWithoutPagination =
  | SearchParamsNonNullable
  | undefined

export type EmployeeFilter = NonNullable<SearchParams>['numberOfEmployeeFilter']
export type EmployeeFilterNonNullable = NonNullable<EmployeeFilter>
export type SignComparator = EmployeeFilterNonNullable['signComparator']

// Pagination types
export type Page = Pick<
  components['schemas']['PageCompanyDetails'],
  'totalPages'
> & { page: number }
export type PageCompanyDetails = components['schemas']['PageCompanyDetails']
export type PageCompanyDtoWithStatusDTO =
  components['schemas']['PageCompanyDtoWithStatusDTO']
export type PageLeader = components['schemas']['PageLeader']

// Main entity types
export type Leader = components['schemas']['Leader']

// Auto-complete types
export type LegalForm = components['schemas']['LegalForm']
export type IndustrySector = components['schemas']['IndustrySector']
export type City = components['schemas']['City']
export type Region = components['schemas']['Region']

export type User = components['schemas']['User']

// Combined types
export type CompanyDtoWithStatusDTO =
  components['schemas']['CompanyDtoWithStatusDTO']
export type CompanyDTO = components['schemas']['CompanyDTO']
export type CompanyDetails = components['schemas']['CompanyDetails']

export type UserCompanyStatus = components['schemas']['UserCompanyStatus']
export type NonNullableUserCompanyStatus = NonNullable<UserCompanyStatus>

export type CheckStatus = NonNullable<
  components['schemas']['UserCompanyStatus']
>['status']
export type Year = components['schemas']['FinancialPeriodDTO']['year']
export type SocialMedia = components['schemas']['SocialMedia']
export type Contact = components['schemas']['Contact']

// Other types (Not directly from the OpenAPI spec as they are JSONB in the DB)
export type Schedule = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

export type Reviews = {
  stars: number
  numberOfReviews: number
}
