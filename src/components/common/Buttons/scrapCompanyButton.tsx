import useToggle from '@/hooks/useToggle'
import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { CompanyDTO } from '@/types/index.types'
import { Button, CircularProgress, Tooltip } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'
import { toast } from 'react-toastify'

import { fetchCompanyScrap } from '../../../utils/api/queries'
import { isDateLessThanOneDay } from '../../parts/TableCompany/tableCompany.util'

type ScrapCompanyButtonProps = {
  company: CompanyDTO
  onScraped: (company: CompanyDTO) => void
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
    queryFn: () => fetchCompanyScrap({ companyId: company.id }),
    enabled: !isDisabled,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      onScraped(data)
      setIsDisabled(isDateLessThanOneDay(data.scrapingDate))
    }
    // Fix: having its own state would remove the infinite render loop caused by the dependency on "onScraped" (parent function)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setIsDisabled])

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
