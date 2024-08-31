import { FiltersProps } from '.'

export const filterDescriptions: {
  [key in FiltersProps['filtersToShow'][number]]: string
} = {
  city: 'Ville',
  region: 'Région',
  industrySector: "Secteur d'activité",
  legalForm: 'Forme juridique',
  employee: 'Nombre de salariés',
  searchButton: 'Search', // Although you might not need this one in the dropdown
}
