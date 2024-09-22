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
        <Typography level="h4">Détails</Typography>
      </div>
      <Table aria-label="Détails de l'Entreprise">
        <tbody>
          <DetailsCompanyRow
            content={company.phoneNumber}
            icon={<PhoneIcon />}
            noContent="Aucun numéro de téléphone trouvé"
            tooltipContent="Numéro de téléphone"
          />

          <DetailsCompanyRow
            content={company.email}
            icon={<EmailIcon />}
            noContent="Aucun e-mail trouvé"
            tooltipContent="E-mail"
          />

          <DetailsCompanyRow
            isLink
            content={company.website}
            icon={<WebAssetIcon />}
            noContent="Aucun site web trouvé"
            tooltipContent="Site Web"
          />

          <DetailsCompanyRow
            content={company.address}
            icon={<BusinessIcon />}
            noContent="Aucune adresse trouvée"
            oppositeContent={company.city}
            tooltipContent="Adresse"
          />

          <DetailsCompanyRow
            content={company.dateRegistration}
            icon={<CalendarTodayOutlinedIcon />}
            noContent="Aucune date de création trouvée"
            tooltipContent="Date de création"
          />
        </tbody>
      </Table>
    </Fragment>
  )
}

export default DetailsCompany
