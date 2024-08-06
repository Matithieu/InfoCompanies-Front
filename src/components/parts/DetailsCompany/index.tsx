import BusinessIcon from '@mui/icons-material/Business'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { Table, Typography } from '@mui/joy'
import { FC, Fragment } from 'react'

import { Company } from '../../../data/types/company'
import { PleaseSelectACompanyText } from '../../common/Texts'
import DetailsCompanyRow from './components/DetailsCompanyRow'

type DetailsCompanyProps = {
  company: Company | undefined
}

const DetailsCompany: FC<DetailsCompanyProps> = ({ company }) => {
  if (company === undefined) {
    return <PleaseSelectACompanyText />
  }

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h4">Details</Typography>
      </div>
      <Table aria-label="Details Company">
        <tbody>
          <DetailsCompanyRow
            content={company.phoneNumber}
            icon={<PhoneIcon />}
            noContent="No phone found"
            tooltipContent="Phone Number"
          />

          <DetailsCompanyRow
            content={company.email}
            icon={<EmailIcon />}
            noContent="No email found"
            tooltipContent="Email"
          />

          <DetailsCompanyRow
            isLink
            content={company.website}
            icon={<WebAssetIcon />}
            noContent="No website found"
            tooltipContent="Website"
          />

          <DetailsCompanyRow
            content={company.address}
            icon={<BusinessIcon />}
            noContent="No address found"
            tooltipContent="Address"
          />

          <DetailsCompanyRow
            content={company.dateRegistration}
            icon={<CalendarTodayOutlinedIcon />}
            noContent="No creation date found"
            tooltipContent="Creation Date"
          />
        </tbody>
      </Table>
    </Fragment>
  )
}

export default DetailsCompany
