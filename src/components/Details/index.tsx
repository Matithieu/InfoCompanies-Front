import { Box, Table, Tooltip, Typography } from "@mui/joy";

import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import Company from "../../data/company";
import { useCompanyStore } from "../../store/companyStore";

export default function Details() {
  const { selectedCompany } = useCompanyStore();

  if (selectedCompany === null) {
    return (
      <a style={{ fontSize: "19px" }}>Veuillez sélectionner une entreprise</a>
    );
  } else if (
    selectedCompany !== null &&
    selectedCompany instanceof Company &&
    typeof selectedCompany.getAdresse === "function"
  ) {
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
                  {selectedCompany.getPhone() ?? "No phone found"}
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
                  {selectedCompany.getEmail() ?? "No email found"}
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
                  {selectedCompany.getWebsite() ?? "No website found"}
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
                  {selectedCompany.getAdresse() ?? "No address found"}
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
                  {selectedCompany.getDateImmatriculation() ?? "No date found"}
                </Typography>
              </td>
            </tr>
          </tbody>
        </Table>
      </Box>
    );
  }
}
