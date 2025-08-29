import CellContent from '@/components/parts/TableCompany/components/content/CellContent'
import CellContentTooltip from '@/components/parts/TableCompany/components/content/CellContentTooltip'
import { formatMessage } from '@/services/intl/intl'
import columnsMessages from '@/types/columns/columns.messages'

import { SearchColumnGenerics } from '../search.types'

type UseSearchColumnsDefParams = {
  handleOpenInNewTab: (content: string) => void
}

export function useSearchColumnsDef({
  handleOpenInNewTab,
}: UseSearchColumnsDefParams): SearchColumnGenerics['TColumns'] {
  return [
    {
      id: 'companyName',
      label: formatMessage(columnsMessages.companyName),
      style: { width: 170 },
      render: (company) => (
        <CellContentTooltip
          content={company.companyName}
          onContentClick={() => {
            const url = `${company.companyName} ${company.city}`
            handleOpenInNewTab(url)
          }}
        />
      ),
    },
    {
      id: 'city',
      label: formatMessage(columnsMessages.city),
      style: { width: 170 },
      render: (company) => <CellContent content={company.city} />,
    },
    {
      id: 'industrySector',
      label: formatMessage(columnsMessages.industrySector),
      style: { width: 170 },
      render: (company) => <CellContent content={company.industrySector} />,
    },
    {
      id: 'region',
      label: formatMessage(columnsMessages.region),
      style: { width: 170 },
      render: (company) => <CellContent content={company.region} />,
    },
  ]
}
