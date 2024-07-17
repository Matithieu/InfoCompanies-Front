import { Button, Tooltip } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Company } from '../../../data/types/company'
import { fetchCompanyScrap } from '../../../utils/api'

type ScrapCompanyButtonProps = {
  company: Company
  onScraped: (company: Company) => void
}

const ScrapCompanyButton: FC<ScrapCompanyButtonProps> = ({
  company,
  onScraped,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  useEffect(() => {
    const calculateIsDisabled = (): boolean => {
      if (!company.scrapingDate) {
        return false
      }

      const currentDate = new Date()
      const scrappedDateObject = new Date(company.scrapingDate)
      const diffTime = Math.abs(
        currentDate.getTime() - scrappedDateObject.getTime(),
      )
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 1 day

      return diffDays === 1
    }

    if (company.scrapingDate) {
      setIsDisabled(calculateIsDisabled())
    }
  }, [company.scrapingDate])

  const { data, error, refetch } = useQuery({
    queryKey: ['companyScraped', company.id],
    queryFn: () => fetchCompanyScrap(company.id),
    enabled: false,
  })

  const handleClick = async () => {
    setIsDisabled(true)
    refetch()

    if (error) toast.error(`Error: ${error.message}`)
  }

  useEffect(() => {
    if (data) {
      onScraped(data)
    }
  }, [data, onScraped])

  return (
    <Tooltip
      sx={{ zIndex: 99999 }}
      title={
        isDisabled
          ? `Vous ne pouvez actualiser qu'une fois par jour. \nDernière actualisation: ${company.scrapingDate}`
          : "Actualiser les données de l'entreprise"
      }
    >
      <span>
        <Button
          color="primary"
          disabled={isDisabled}
          variant={isDisabled ? 'solid' : 'soft'}
          onClick={handleClick}
        >
          Actualiser
        </Button>
      </span>
    </Tooltip>
  )
}

export default ScrapCompanyButton
