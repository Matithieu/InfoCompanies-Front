import { CompanyDTO } from '@/types/index.types'
import BusinessIcon from '@mui/icons-material/Business'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { Table, Typography } from '@mui/joy'
import { FC } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { PleaseSelectACompanyText } from '../../common/Texts/PleaseSelectACompanyText'
import DetailsCompanyRowRenderer from './components/DetailsCompanyRowRenderer'

type DetailsCompanyProps = {
  company: CompanyDTO | undefined
}

const DetailsCompany: FC<DetailsCompanyProps> = ({ company }) => {
  if (company === undefined) {
    return <PleaseSelectACompanyText />
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h4">
          {formatMessage(commonMessages.details)}
        </Typography>
      </div>

      <Table>
        <tbody>
          <DetailsCompanyRowRenderer
            content={company.contact?.phoneNumber}
            icon={<PhoneIcon />}
            noContent={formatMessage(commonMessages.noPhone)}
            tooltipContent={formatMessage(commonMessages.phoneTooltip)}
          />

          <DetailsCompanyRowRenderer
            content={company.contact?.email}
            icon={<EmailIcon />}
            noContent={formatMessage(commonMessages.noEmail)}
            tooltipContent={formatMessage(commonMessages.emailTooltip)}
          />

          <DetailsCompanyRowRenderer
            isLink
            content={company.contact?.website}
            icon={<WebAssetIcon />}
            noContent={formatMessage(commonMessages.noWebsite)}
            tooltipContent={formatMessage(commonMessages.websiteTooltip)}
          />

          <DetailsCompanyRowRenderer
            content={company.address}
            icon={<BusinessIcon />}
            noContent={formatMessage(commonMessages.noAddress)}
            oppositeContent={company.city}
            tooltipContent={formatMessage(commonMessages.addressTooltip)}
          />

          <DetailsCompanyRowRenderer
            content={company.registrationDate}
            icon={<CalendarTodayOutlinedIcon />}
            noContent={formatMessage(commonMessages.noCreationDate)}
            tooltipContent={formatMessage(commonMessages.creationDateTooltip)}
          />
        </tbody>
      </Table>
    </>
  )
}

export default DetailsCompany
