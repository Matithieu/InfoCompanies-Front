// src/components/TestTableCompany.tsx
import Filters from '@/components/parts/Filters/Filters'
import TableCompany from '@/components/parts/TableCompany/TableCompany'
import {
  handleCopyToClipboard,
  handleOpenInNewTab,
} from '@/pages/Dashboard/dashboardPage.util'
import { useCompanyFilterStore } from '@/stores/FiltersStore'
import { fetchCompanyOnLandingPage } from '@/utils/api/queries'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { useLandingColumnsDef } from './hooks/useLandingColumnDef'
import { LandingColumnGenerics } from './landing.types'

const LandingTableCompany: FC = () => {
  const {
    filterValues: { cityNames, industrySectorNames },
  } = useCompanyFilterStore()

  const landingColumnsDef = useLandingColumnsDef({
    handleCopyToClipboard: handleCopyToClipboard,
    handleOpenInNewTab: handleOpenInNewTab,
  })

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', cityNames, industrySectorNames],
    queryFn: () =>
      fetchCompanyOnLandingPage({ cityNames, industrySectorNames }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <section className="container w-full">
      <div className="group relative">
        <div className="absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80" />

        <div className="md:pb-32">
          <div className="flex items-center justify-center pb-10">
            <Filters
              filtersToShow={['cityNames', 'industrySectorNames']}
              showAddFilterButton={false}
            />
          </div>

          <TableCompany<
            LandingColumnGenerics['TId'],
            LandingColumnGenerics['FSubId'],
            LandingColumnGenerics['TRow']
          >
            columns={landingColumnsDef}
            data={data?.content}
            error={error}
            isPending={isPending}
          />
        </div>
      </div>
    </section>
  )
}

export default LandingTableCompany
