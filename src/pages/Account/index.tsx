import {
  Box,
  Grid,
  Stack,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
} from '@mui/joy'
import { FC } from 'react'

import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import useAuthStore from '../../store/authStore'
import ViewInvoices from '../Purchasing/invoice'
import Account from './component/Account'

const AccountPage: FC = () => {
  const { authUser, requestLoading } = useAuthStore()

  if (requestLoading) {
    return <div>Chargement...</div>
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
            <HeaderTitle text={`Bienvenue, ${authUser?.firstName}`} />
          </Box>

          <Tabs defaultValue={0} sx={{ backgroundColor: 'transparent' }}>
            <TabList
              size="sm"
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: 'left',
                [`&& .${tabClasses.root}`]: {
                  fontWeight: '600',
                  flex: 'initial',
                  color: 'text.tertiary',
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: 'transparent',
                    color: 'text.primary',
                    '&::after': {
                      height: '2px',
                      bgcolor: 'primary.500',
                    },
                  },
                },
              }}
              tabFlex={1}
            >
              <Tab indicatorInset sx={{ borderRadius: '6px 6px 0 0' }}>
                Profile
              </Tab>
              <Tab indicatorInset sx={{ borderRadius: '6px 6px 0 0' }}>
                Factures
              </Tab>
            </TabList>
            <Stack
              spacing={4}
              sx={{
                display: 'flex',
                maxWidth: '800px',
                mx: 'auto',
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              <TabPanel value={0}>
                <Account />
              </TabPanel>
              <TabPanel value={1}>
                <ViewInvoices />
              </TabPanel>
            </Stack>
          </Tabs>
        </Box>
      </Grid>
    )
  }
}

export default AccountPage
