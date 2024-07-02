import BusinessIcon from '@mui/icons-material/Business'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { Table, Typography } from '@mui/joy'

import { useCompanyStore } from '../../../store/companyStore'
import DetailsCompanyRow from './components/DetailsCompanyRow'
import React from 'react'

export default function DetailsCompany() {
  const { selectedCompany } = useCompanyStore()

  if (selectedCompany === null) {
    return (
      <a style={{ fontSize: '19px' }}>Veuillez sélectionner une entreprise</a>
    )
  } else if (selectedCompany !== null) {
    return (
      <React.Fragment>
        <Typography level="h4">Details</Typography>
        <Table aria-label="List Of Leaders">
          <tbody>
            <DetailsCompanyRow
              content={selectedCompany.phoneNumber}
              icon={<PhoneIcon />}
              noContent="No phone found"
              tooltipContent="Phone Number"
            />

            <DetailsCompanyRow
              content={selectedCompany.email}
              icon={<EmailIcon />}
              noContent="No email found"
              tooltipContent="Email"
            />

            <DetailsCompanyRow
              isLink
              content={selectedCompany.website}
              icon={<WebAssetIcon />}
              noContent="No website found"
              tooltipContent="Website"
            />

            <DetailsCompanyRow
              content={selectedCompany.address}
              icon={<BusinessIcon />}
              noContent="No address found"
              tooltipContent="Address"
            />

            <DetailsCompanyRow
              content={selectedCompany.dateRegistration}
              icon={<CalendarTodayOutlinedIcon />}
              noContent="No creation date found"
              tooltipContent="Creation Date"
            />
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}
