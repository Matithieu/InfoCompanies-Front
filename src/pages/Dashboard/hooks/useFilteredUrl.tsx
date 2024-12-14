import React, { useEffect } from 'react'

import { RANDOM_UNSEEN_ENDPOINT } from '../../../data/types/index.types'
import { SearchParams } from '../../../stores/filtersStore'
import { constructURLWithFilter } from '../../../utils/api/utils'

// Note: Can become a generic hook for filtering in different views
type useFilteredProps = {
  searchParams: SearchParams
  url: string | undefined
  setPagination: (page: number) => void

  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>
}

/**
 * This hook builds and update the given url and pagination depending on the filters
 */
const useFilteredUrl = ({
  searchParams,
  url,
  setPagination,
  setUrl,
}: useFilteredProps) => {
  useEffect(() => {
    const changeURL = () => {
      let newUrl = ''

      if (
        searchParams.city.length === 0 &&
        searchParams.industrySector.length === 0 &&
        searchParams.legalForm.length === 0 &&
        searchParams.region.length === 0 &&
        searchParams.employee.amount === undefined &&
        searchParams.socials.length === 0 &&
        searchParams.contact.length === 0 &&
        searchParams.isCompanySeen === false
      ) {
        setPagination(0)
        newUrl = `${RANDOM_UNSEEN_ENDPOINT}?`
      } else {
        setPagination(0)
        newUrl = constructURLWithFilter(searchParams, 'filter-by-parameters?')
      }

      if (url !== newUrl) {
        setUrl(newUrl)
      }
    }

    changeURL()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
}

export default useFilteredUrl
