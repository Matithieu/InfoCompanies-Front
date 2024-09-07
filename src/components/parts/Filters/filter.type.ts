import { EmployeeFilter } from '../../../data/types/common'
import { SocialMedia } from '../../../data/types/company'
import { Contact } from './components/ContactFilter'

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
  contact: 'Contact',
  isCompanySeen: 'Entreprises vues',
  searchButton: 'Search', // Not needed because not in the dropdown
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
  email: 'Email',
  phone: 'Téléphone',
  website: 'Site web',
}
