export interface Column {
  id: string
  label: string
  minWidth?: number | string
  align?: 'right' | 'center' | 'left'
}
export const columnsTableCompany: Column[] = [
  { id: 'checked', label: '', minWidth: 100, align: 'center' },
  { id: 'companyName', label: 'Dénomination', minWidth: 170 },
  { id: 'phoneNumber', label: 'Téléphone', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 140 },
  { id: 'website', label: 'Site Web', minWidth: 170 },

  { id: 'socialMedia', label: 'Réseaux Sociaux', minWidth: 200 },

  { id: 'numberOfEmployee', label: 'Salariés', minWidth: 100 },
  { id: 'city', label: 'Ville', minWidth: 170 },
  { id: 'dateRegistration', label: 'Date Immatriculation', minWidth: 170 },
  { id: 'industrySector', label: "Secteur d'Activité", minWidth: 170 },
  { id: 'legalForm', label: 'Forme Juridique', minWidth: 170 },
  { id: 'address', label: 'Adresse', minWidth: 170 },
  { id: 'region', label: 'Région', minWidth: 170 },
]

export const columnsTableCompanySearch: Column[] = [
  { id: 'checked', label: '', minWidth: 100 },
  { id: 'companyName', label: 'Denomination', minWidth: '100%' },
  { id: 'industrySector', label: "Secteur d'Activité", minWidth: '100%' },
  { id: 'city', label: 'Ville', minWidth: '100%' },
  { id: 'region', label: 'Region', minWidth: '100%' },
]
