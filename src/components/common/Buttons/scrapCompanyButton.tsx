import useToggle from '@/hooks/useToggle'
import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { Button, CircularProgress, Tooltip } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Company } from '../../../data/types/company'
import { fetchCompanyScrap } from '../../../utils/api/queries'
import { isDateLessThanOneDay } from '../../parts/TableCompany/tableCompany.util'

type ScrapCompanyButtonProps = {
  company: Company
  onScraped: (company: Company) => void
}

const ScrapCompanyButton: FC<ScrapCompanyButtonProps> = ({
  company,
  onScraped,
}) => {
  const [isDisabled, setIsDisabled] = useToggle(
    isDateLessThanOneDay(company.scrapingDate),
  )

  const { data, error, refetch, isFetching } = useQuery({
    queryKey: ['company-scrap', company.id],
    queryFn: () => fetchCompanyScrap(company.id),
    enabled: !isDisabled,
    staleTime: Infinity,
  })

  useEffect(() => {
    const newDisabledState = isDateLessThanOneDay(company.scrapingDate)
    setIsDisabled(newDisabledState)
  }, [company.scrapingDate, setIsDisabled])

  useEffect(() => {
    if (data) {
      onScraped(data)
    }
  }, [data, onScraped])

  const handleClick = async () => {
    setIsDisabled(true)
    refetch()

    if (error) toast.error(`Error: ${error.message}`)
  }

  return (
    <Tooltip
      sx={{ zIndex: 100, maxWidth: 350 }}
      title={
        isDisabled
          ? formatMessage(commonMessages.refreshLimit, {
              scrapingDate: company.scrapingDate,
            })
          : formatMessage(commonMessages.refreshCompanyData)
      }
    >
      <span>
        <Button
          color="primary"
          disabled={isDisabled}
          endDecorator={isFetching ? <CircularProgress /> : undefined}
          variant={isDisabled ? 'solid' : 'soft'}
          onClick={handleClick}
        >
          {formatMessage(commonMessages.refresh)}
        </Button>
      </span>
    </Tooltip>
  )
}

export default ScrapCompanyButton
