import { Box, Grid } from '@mui/joy'
import { FC } from 'react'

import { LoadingText } from '../../components/common/Loading/TextLoading'
import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage, formatMessagePlural } from '../../services/intl/intl'
import useAuthStore from '../../store/authStore'
import ViewInvoices from '../Purchasing/invoice'
import accountMessages from './Account.messages'
import Account from './component/Account'

const AccountPage: FC = () => {
  const { authUser, requestLoading } = useAuthStore()

  if (requestLoading) {
    return <LoadingText />
  } else {
    return (
      <Grid>
        <Box
          sx={{
            position: 'sticky',
            top: { sm: -100, md: -110 },
            bgcolor: 'background.body',
            zIndex: 1,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <HeaderTitle
              text={`${formatMessage(accountMessages.welcome, { name: authUser?.firstName })}`}
            />
          </Box>

          <Tabs
            tabsContent={[
              <Account key={formatMessage(accountMessages.accountProfile)} />,
              <ViewInvoices
                key={formatMessagePlural(accountMessages.invoices)}
              />,
            ]}
            tabsName={[
              formatMessage(accountMessages.accountProfile),
              formatMessagePlural(accountMessages.invoices),
            ]}
          />
        </Box>
      </Grid>
    )
  }
}

export default AccountPage
