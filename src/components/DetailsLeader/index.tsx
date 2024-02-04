import BusinessIcon from "@mui/icons-material/Business";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Container, Sheet, Table, Tooltip } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Leader from "../../data/leader";

export function toAgeFromDate(date: Date) {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 *
 * @param leaderDetails Takes a leader as a parameter and displays his details in a table when selected
 * @returns A table of details for a leader
 */
export default function DetailsLeader({
  leaderDetails,
}: {
  leaderDetails: Leader | null;
}) {
  const navigate = useNavigate();

  if (leaderDetails === null) {
    return (
      <a style={{ fontSize: "19px", fontFamily: "Poppins" }}>
        Veuillez sélectionner une entreprise
      </a>
    );
  } else {
    return (
      <Container component={Sheet} style={{}}>
        <h2
          style={{
            display: "flex",
            fontFamily: "Poppins",
            justifyContent: "center",
          }}
        >
          Détails
        </h2>
        <Table sx={{ minWidth: 150 }} aria-label="List Of Leaders">
          <tbody>
            <tr key={leaderDetails.getPhone()} style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Numéro de téléphone" placement="top">
                  <PhoneIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>{leaderDetails.getPhone()}</a>
              </td>
            </tr>
            <tr key={leaderDetails.getEmail()} style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Adresse email" placement="top">
                  <EmailIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>{leaderDetails.getEmail()}</a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Age" placement="top">
                  <CakeIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                <a style={{ fontSize: "18px" }}>
                  {toAgeFromDate(leaderDetails.getDateNaissance()) + " ans"}
                </a>
              </td>
            </tr>
            <tr style={{ border: 0 }}>
              <td scope="row">
                <Tooltip arrow title="Entreprises" placement="top">
                  <BusinessIcon />
                </Tooltip>
                <span style={{ marginLeft: "10px" }}></span>
                {leaderDetails.getListOfCompanies().map((company, index) => (
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
                        });
                      }}
                    >
                      {company.denomination}
                    </a>
                  </span>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}
