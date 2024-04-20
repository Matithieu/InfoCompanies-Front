import BusinessIcon from "@mui/icons-material/Business"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import WebAssetIcon from "@mui/icons-material/WebAsset"
import { Box, Table, Tooltip, Typography } from "@mui/joy"

import { useCompanyStore } from "../../../store/companyStore"

export default function DetailsCompany() {
  const { selectedCompany } = useCompanyStore()

  if (selectedCompany === null) {
    return (
      <a style={{ fontSize: "19px" }}>Veuillez sélectionner une entreprise</a>
    )
  } else if (selectedCompany !== null) {
    return (
      <Box>
        <a
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Détails
        </a>
        <Table aria-label="List Of Leaders">
          <tbody>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  startDecorator={
                    <Tooltip arrow placement="top" title="Numéro de téléphone">
                      <PhoneIcon />
                    </Tooltip>
                  }
                  style={{ fontSize: "18px", overflow: "hidden " }}
                >
                  {selectedCompany.phoneNumber ?? "No phone found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  startDecorator={
                    <Tooltip arrow placement="top" title="Adresse email">
                      <EmailIcon />
                    </Tooltip>
                  }
                  style={{ fontSize: "18px", overflow: "hidden " }}
                >
                  {selectedCompany.email ?? "No email found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  startDecorator={
                    <Tooltip arrow placement="top" title="Site web">
                      <WebAssetIcon />
                    </Tooltip>
                  }
                  style={{ fontSize: "18px", overflow: "auto" }}
                >
                  {selectedCompany.website ?? "No website found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  startDecorator={
                    <Tooltip arrow placement="top" title="Adresse">
                      <BusinessIcon />
                    </Tooltip>
                  }
                  style={{ fontSize: "18px", overflow: "hidden " }}
                >
                  {selectedCompany.address ?? "No address found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  startDecorator={
                    <Tooltip arrow placement="top" title="Date de création">
                      <CalendarTodayOutlinedIcon />
                    </Tooltip>
                  }
                  style={{ fontSize: "18px", overflow: "hidden " }}
                >
                  {selectedCompany.dateRegistration ?? "No date found"}
                </Typography>
              </td>
            </tr>
          </tbody>
        </Table>
      </Box>
    )
  }
}
