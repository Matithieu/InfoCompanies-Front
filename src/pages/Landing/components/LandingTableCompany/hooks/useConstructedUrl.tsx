// src/hooks/useConstructedUrl.ts
import { LANDING_FILTER_ENDPOINT } from '@/data/types/index.types'
import { useCompanyFilterStore } from '@/store/filtersStore'
import { constructURLWithFilter } from '@/utils/api/utils'
import { useEffect, useState } from 'react'

export const useConstructedUrl = () => {
  const [url, setUrl] = useState<string | undefined>(undefined)

  const {
    searchParams: { city, industrySector },
  } = useCompanyFilterStore()

  useEffect(() => {
    let newUrl = ''

    if (city.length === 0 && industrySector.length === 0) {
      // Filtre par défaut lorsqu'aucune ville ou secteur industriel n'est sélectionné
      newUrl = constructURLWithFilter(
        {
          region: ['Bretagne'],
          city: [],
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
      // Construire l'URL en fonction de la ville et du secteur industriel sélectionnés
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

    // Mettre à jour l'état de l'URL uniquement si elle a changé
    if (url !== newUrl) {
      setUrl(newUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, industrySector])

  return url
}
