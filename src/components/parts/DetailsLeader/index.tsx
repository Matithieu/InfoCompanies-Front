import BusinessIcon from "@mui/icons-material/Business"
import CakeIcon from "@mui/icons-material/Cake"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import { Container, Sheet, Table, Tooltip } from "@mui/joy"
import { useNavigate } from "react-router-dom"
import { Leader } from "../../data/types/leader"

export function toAgeFromDate(date: Date) {
  const today = new Date()
  const birthDate = new Date(date)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export default function DetailsLeader({
  leaderDetails,
}: {
  leaderDetails: Leader | null
}) {
  const navigate = useNavigate()

  if (leaderDetails === null) {
    return (
      <a style={{ fontSize: "19px" }}>Veuillez sélectionner une entreprise</a>
    )
  } else {
    return (
      <Container component={Sheet} style={{}}>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Détails
        </h2>
        <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
          <tbody>
            <tr key={leaderDetails.phone} style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Numéro de téléphone" placement="top">
                  <PhoneIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>{leaderDetails.phone}</a>
              </td>
            </tr>
            <tr key={leaderDetails.email} style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Adresse email" placement="top">
                  <EmailIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>{leaderDetails.email}</a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Age" placement="top">
                  <CakeIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {toAgeFromDate(leaderDetails.dateOfBirth) + " ans"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Entreprises" placement="top">
                  <BusinessIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                {leaderDetails.listOfCompanies.map((company, index) => (
                  <span
                    key={index}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  >
                    {index > 0 ? ", " : ""}
                    <a
                      onClick={() => {
                        navigate(`/search/${company.id}`, {
                          state: {
                            searchTerm: company.id,
                          },
                        })
                      }}
                    >
                      {company.name}
                    </a>
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
  }
}
