import { formatMessage } from '../../services/intl/intl'
import columnsMessages from './columns.messages'

export interface Column {
  id: string
  label: string
  minWidth?: number | string
  align?: 'right' | 'center' | 'left'
}

export const columnsTableCompany: Column[] = [
  { id: 'checked', label: '', minWidth: 100, align: 'center' },
  {
    id: 'companyName',
    label: formatMessage(columnsMessages.companyName),
    minWidth: 170,
  },
  {
    id: 'phoneNumber',
    label: formatMessage(columnsMessages.phoneNumber),
    minWidth: 170,
  },
  { id: 'email', label: formatMessage(columnsMessages.email), minWidth: 140 },
  {
    id: 'website',
    label: formatMessage(columnsMessages.website),
    minWidth: 170,
  },

  {
    id: 'socialMedia',
    label: formatMessage(columnsMessages.socialMedia),
    minWidth: 200,
  },

  {
    id: 'numberOfEmployee',
    label: formatMessage(columnsMessages.numberOfEmployee),
    minWidth: 100,
  },
  { id: 'city', label: formatMessage(columnsMessages.city), minWidth: 170 },
  {
    id: 'dateRegistration',
    label: formatMessage(columnsMessages.dateRegistration),
    minWidth: 170,
  },
  {
    id: 'industrySector',
    label: formatMessage(columnsMessages.industrySector),
    minWidth: 170,
  },
  {
    id: 'legalForm',
    label: formatMessage(columnsMessages.legalForm),
    minWidth: 170,
  },
  {
    id: 'address',
    label: formatMessage(columnsMessages.address),
    minWidth: 170,
  },
  { id: 'region', label: formatMessage(columnsMessages.region), minWidth: 170 },
]

export const columnsTableCompanySearch: Column[] = [
  { id: 'checked', label: '', minWidth: 100 },
  {
    id: 'companyName',
    label: formatMessage(columnsMessages.companyName),
    minWidth: '100%',
  },
  {
    id: 'industrySector',
    label: formatMessage(columnsMessages.industrySector),
    minWidth: '100%',
  },
  { id: 'city', label: formatMessage(columnsMessages.city), minWidth: '100%' },
  {
    id: 'region',
    label: formatMessage(columnsMessages.region),
    minWidth: '100%',
  },
]
