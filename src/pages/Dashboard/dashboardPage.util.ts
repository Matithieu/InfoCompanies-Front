import tableCompanyMessages from '@/components/parts/TableCompany/tableCompany.messages'
import { formatMessage } from '@/services/intl/intl'
import {
  SearchParamsNonNullable,
  SearchParamsNullableWithoutPagination,
} from '@/types/index.types'
import {
  fetchCompaniesWithFilters,
  fetchRandomUnseenCompany,
} from '@/utils/api/queries'
import { toast } from 'react-toastify'

type SelectQueryForDashboardProps = {
  searchParams: SearchParamsNullableWithoutPagination
  page: number
}

/**
 * This function selects the appropriate query to fetch companies for the dashboard
 * based on whether any filters are applied.
 */
export const selectQueryForDashboard = ({
  searchParams,
  page,
}: SelectQueryForDashboardProps) => {
  const areFiltersEmpty = (() => {
    const checks = {
      cityNames: !searchParams?.cityNames?.length,
      industrySectorNames: !searchParams?.industrySectorNames?.length,
      legalFormNames: !searchParams?.legalFormNames?.length,
      regionNames: !searchParams?.regionNames?.length,
      numberOfEmployeeFilter:
        !searchParams?.numberOfEmployeeFilter?.signComparator &&
        !searchParams?.numberOfEmployeeFilter?.numberOfEmployee,
      socials: !Object.values(searchParams?.socials || {}).some(Boolean),
      contacts: !Object.values(searchParams?.contacts || {}).some(Boolean),
      isCompanySeen: !searchParams?.isCompanySeen,
    } satisfies Record<keyof SearchParamsNonNullable, boolean>

    return Object.values(checks).every(Boolean)
  })()

  if (areFiltersEmpty) {
    return fetchRandomUnseenCompany({ page })
  } else {
    return fetchCompaniesWithFilters({
      cityNames: searchParams?.cityNames || [],
      contacts: searchParams?.contacts || null,
      industrySectorNames: searchParams?.industrySectorNames || [],
      isCompanySeen: searchParams?.isCompanySeen || false,
      legalFormNames: searchParams?.legalFormNames || [],
      numberOfEmployeeFilter: searchParams?.numberOfEmployeeFilter || null,
      regionNames: searchParams?.regionNames || [],
      socials: searchParams?.socials || null,
      page,
      size: 10,
    })
  }
}

export const handleCopyToClipboard = (content: string | undefined) => {
  if (!content) return
  navigator.clipboard.writeText(content)
  toast.success(formatMessage(tableCompanyMessages.copyToClipboard))
}

export const handleOpenInNewTab = (content: string) => {
  const url = `https://www.google.com/search?q=${encodeURIComponent(content)}`
  window.open(url, '_blank')
}
