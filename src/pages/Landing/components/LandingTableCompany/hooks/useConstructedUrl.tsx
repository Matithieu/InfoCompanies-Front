import { LANDING_FILTER_ENDPOINT } from '@/data/types/index.types'
import { useCompanyFilterStore } from '@/stores/filtersStore'
import { constructURLWithFilter } from '@/utils/api/utils'
import { useEffect, useState } from 'react'

/**
 * This hook builds the URL based on the selected city and industry sector
 */
export const useConstructedUrl = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)

  const {
    searchParams: { city, industrySector },
  } = useCompanyFilterStore()

  useEffect(() => {
    let newUrl = ''

    if (city.length === 0 && industrySector.length === 0) {
      // Define default URL when no city and industry sector are selected
      newUrl = constructURLWithFilter(
        {
          region: [],
          city: [
            {
              id: 0,
              name: 'PARIS',
            },
          ],
          industrySector: [],
          legalForm: [],
          employee: { amount: undefined, comparator: undefined },
          socials: [],
          contact: [],
          isCompanySeen: false,
        },
        `${LANDING_FILTER_ENDPOINT}?`,
      )
    } else {
      // Construct URL with selected city and industry sector
      newUrl = constructURLWithFilter(
        {
          city,
          industrySector,
          legalForm: [],
          region: [],
          employee: { amount: undefined, comparator: undefined },
          socials: [],
          contact: [],
          isCompanySeen: false,
        },
        `${LANDING_FILTER_ENDPOINT}?`,
      )
    }

    if (url !== newUrl) {
      setUrl(newUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, industrySector])

  return url
}
