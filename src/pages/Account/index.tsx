import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
} from "@mui/joy"
import Account from "./component"
import useAuthStore from "../../store/authStore"
import ViewInvoices from "../Purchasing/invoice"

export default function AccountPage() {
  const { authUser, requestLoading } = useAuthStore()

  if (requestLoading) {
    return <div>Chargement...</div>
  } else {
    return (
      <Box sx={{ flex: 1, width: "100%" }}>
        <Box
          sx={{
            position: "sticky",
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Typography level="h1" component="h1" style={{ marginTop: 20 }}>
              Bienvenue, {authUser?.firstName}
            </Typography>
          </Box>

          <Tabs defaultValue={0} sx={{ backgroundColor: "transparent" }}>
            <TabList
              tabFlex={1}
              size="sm"
              sx={{
                pl: { xs: 0, md: 4 },
                justifyContent: "left",
                [`&& .${tabClasses.root}`]: {
                  fontWeight: "600",
                  flex: "initial",
                  color: "text.tertiary",
                  [`&.${tabClasses.selected}`]: {
                    bgcolor: "transparent",
                    color: "text.primary",
                    "&::after": {
                      height: "2px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset>
                Profile
              </Tab>
              <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset>
                Test
              </Tab>
              <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset>
                Factures
              </Tab>
            </TabList>
            <Stack
              spacing={4}
              sx={{
                display: "flex",
                maxWidth: "800px",
                mx: "auto",
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              <TabPanel value={0}>
                <Account />
              </TabPanel>
              <TabPanel value={1}>
                <div>Test</div>
              </TabPanel>
              <TabPanel value={2}>
                <ViewInvoices />
              </TabPanel>
            </Stack>
          </Tabs>
        </Box>
      </Box>
    )
  }
}
