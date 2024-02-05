import { Box, Table, Tooltip } from "@mui/joy";

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
                <Tooltip arrow title="Numéro de téléphone" placement="top">
                  <PhoneIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {selectedCompany.getPhone() ?? "No phone found"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Adresse email" placement="top">
                  <EmailIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {selectedCompany.getEmail() ?? "No email found"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Site web" placement="top">
                  <WebAssetIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {selectedCompany.getWebsite() ?? "No website found"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Adresse" placement="top">
                  <BusinessIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {selectedCompany.getAdresse() ?? "No address found"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Date de création" placement="top">
                  <CalendarTodayOutlinedIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {selectedCompany.getDateImmatriculation() ?? "No date found"}
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </Box>
    );
  }
}
