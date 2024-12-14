// src/components/TestTableCompany.tsx
import Filters from '@/components/parts/Filters'
import TableCompany from '@/components/parts/TableCompany/TableCompany'
import { columnsTableCompany } from '@/data/types/columns'
import { fetchCompaniesWithUrlAndPage } from '@/utils/api/queries'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { useConstructedUrl } from './hooks/useConstructedUrl'

const LandingTableCompany: FC = () => {
  const url = useConstructedUrl()

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', url],
    queryFn: () => fetchCompaniesWithUrlAndPage(url!, 0, false),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!url,
  })

  return (
    <section className="container w-full">
      <div className="group relative">
        <div className="absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80" />

        <div className="md:pb-32">
          <div className="flex items-center justify-center pb-10">
            <Filters
              filtersToShow={['city', 'industrySector']}
              showAddFilterButton={false}
            />
          </div>

          <TableCompany
            columns={columnsTableCompany}
            data={data}
            error={error}
            isCheckboxVisible={false}
            isPagination={false}
            isPending={isPending}
            onCompanyDetailsClick={() => {}}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </section>
  )
}

export default LandingTableCompany
