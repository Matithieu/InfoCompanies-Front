import { EmployeeFilter } from '../../../data/types/common'
import { SocialMedia } from '../../../data/types/company'

import { FiltersProps } from '.'

export const filterDescriptions: {
  [key in FiltersProps['filtersToShow'][number]]: string
} = {
  city: 'Ville',
  region: 'Région',
  industrySector: "Secteur d'activité",
  legalForm: 'Forme juridique',
  employee: 'Nombre de salariés',
  socials: 'Réseaux sociaux',
  searchButton: 'Search', // Although you might not need this one in the dropdown
}

export type SelectedFilterType =
  | string[]
  | unknown[]
  | EmployeeFilter
  | Array<keyof SocialMedia>
