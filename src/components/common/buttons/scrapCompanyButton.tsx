import { Button, Tooltip } from '@mui/joy'
import { useEffect, useState } from 'react'

import { useCompanyStore } from '../../../store/companyStore'
import { fetchCompanyScrap } from '../../../utils/api'

export default function ScrapCompanyButton() {
  const { selectedCompany, setSelectedCompany } = useCompanyStore()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {
    const calculateIsDisabled = (): boolean => {
      if (!selectedCompany?.scrapingDate) {
        return false
      }

      const currentDate = new Date()
      const scrappedDateObject = new Date(selectedCompany?.scrapingDate)
      const diffTime = Math.abs(
        currentDate.getTime() - scrappedDateObject.getTime(),
      )
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return diffDays === 1
    }

    if (selectedCompany?.scrapingDate) {
      setIsDisabled(calculateIsDisabled())
    }
  }, [selectedCompany?.scrapingDate])

  const scrapCompany = async () => {
    setIsDisabled(true)

    if (selectedCompany) {
      const company = await fetchCompanyScrap(selectedCompany?.id)

      if (company !== null) {
        setSelectedCompany(company)
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
  }

  return (
    <Tooltip
      sx={{ zIndex: 99999 }}
      title={
        isDisabled
          ? `Vous ne pouvez actualiser qu'une fois par jour. \nDernière actualisation: ${selectedCompany?.scrapingDate}`
          : "Actualiser les données de l'entreprise"
      }
    >
      <span>
        <Button
          color="primary"
          disabled={isDisabled}
          variant={isDisabled ? 'solid' : 'soft'}
          onClick={() => {
            scrapCompany()
          }}
        >
          Actualiser
        </Button>
      </span>
    </Tooltip>
  )
}
