import { Box, Table, Tooltip, Typography } from "@mui/joy"

import BusinessIcon from "@mui/icons-material/Business"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import WebAssetIcon from "@mui/icons-material/WebAsset"
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
                  style={{ fontSize: "18px", overflow: "hidden " }}
                  startDecorator={
                    <Tooltip arrow title="Numéro de téléphone" placement="top">
                      <PhoneIcon />
                    </Tooltip>
                  }
                >
                  {selectedCompany.phoneNumber ?? "No phone found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  style={{ fontSize: "18px", overflow: "hidden " }}
                  startDecorator={
                    <Tooltip arrow title="Adresse email" placement="top">
                      <EmailIcon />
                    </Tooltip>
                  }
                >
                  {selectedCompany.email ?? "No email found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  style={{ fontSize: "18px", overflow: "auto" }}
                  startDecorator={
                    <Tooltip arrow title="Site web" placement="top">
                      <WebAssetIcon />
                    </Tooltip>
                  }
                >
                  {selectedCompany.website ?? "No website found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  style={{ fontSize: "18px", overflow: "hidden " }}
                  startDecorator={
                    <Tooltip arrow title="Adresse" placement="top">
                      <BusinessIcon />
                    </Tooltip>
                  }
                >
                  {selectedCompany.address ?? "No address found"}
                </Typography>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <span style={{ marginLeft: "10px" }}></span>
                <Typography
                  style={{ fontSize: "18px", overflow: "hidden " }}
                  startDecorator={
                    <Tooltip arrow title="Date de création" placement="top">
                      <CalendarTodayOutlinedIcon />
                    </Tooltip>
                  }
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
