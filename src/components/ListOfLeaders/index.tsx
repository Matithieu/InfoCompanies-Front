import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Container, Table } from "@mui/joy";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Company from "../../data/company";
import Leader from "../../data/leader";
import { useCompanyStore } from "../../store/companyStore";

/**
 *
 * @param companyDetails Takes a company as a parameter and displays its leaders in a table when selected
 * @returns A table of leaders
 */
export default function ListOfLeaders() {
  const navigate = useNavigate();

  const { selectedCompany } = useCompanyStore();

  const [leaders, setLeaders] = useState<Leader[]>(null as unknown as Leader[]);

  React.useEffect(() => {
    const temp: Leader[] = [];

    if (
      selectedCompany !== null &&
      selectedCompany instanceof Company &&
      typeof selectedCompany.getAdresse === "function"
    ) {
      setLeaders(temp);
    } else {
      setLeaders(null as unknown as Leader[]);
    }
  }, [selectedCompany]);

  if (leaders === null) {
    return (
      <a style={{ fontSize: "19px", fontFamily: "Poppins" }}>
        Veuillez sélectionner une entreprise
      </a>
    );
  }
  if (leaders.length === 0) {
    return (
      <a style={{ fontSize: "19px", fontFamily: "Poppins" }}>
        Pas de données pour cette entreprise
      </a>
    );
  } else {
    return (
      <Container style={{ borderRadius: 9 }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Poppins",
            justifyContent: "center",
            marginTop: 5,
            top: "0",
          }}
        >
          Liste des dirigeants
        </div>
        <Table sx={{ minWidth: 220 }} aria-label="List Of Leaders">
          <tbody>
            {leaders?.length > 0 &&
              leaders?.map((row) => (
                <tr
                  key={row.getId()}
                  onClick={() => {
                    navigate(`/leaders/${row.getId()}`);
                  }}
                  style={{
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  <td align="left">
                    <AccountCircleIcon />
                  </td>
                  <td
                    scope="row"
                    style={{
                      fontFamily: "Poppins",
                    }}
                  >
                    {row.getNom()} {row.getPrenom()}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
