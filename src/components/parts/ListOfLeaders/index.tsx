import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Container, Table } from '@mui/joy'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Leader } from '../../../data/types/leader'
import { useCompanyStore } from '../../../store/companyStore'
import { PleaseSelectACompanyText } from '../../common/Texts'

/**
 *
 * @param companyDetails Takes a company as a parameter and displays its leaders in a table when selected
 * @returns A table of leaders
 */
export default function ListOfLeaders() {
  const navigate = useNavigate()
  const { selectedCompany } = useCompanyStore()
  const [leaders, setLeaders] = useState<Leader[]>(null as unknown as Leader[])

  React.useEffect(() => {
    const leader: Leader[] = []

    if (selectedCompany !== null) {
      setLeaders(leader)
    } else {
      setLeaders(null as unknown as Leader[])
    }
  }, [selectedCompany])

  if (leaders === null) {
    return <PleaseSelectACompanyText />
  } else {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Liste des dirigeants
        </div>
        <Table aria-label="List Of Leaders">
          <tbody>
            {leaders.length > 0 &&
              leaders.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    border: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate(`/leaders/${row.id}`)
                  }}
                >
                  <td align="left">
                    <AccountCircleIcon />
                  </td>
                  <td scope="row">
                    {row.lastName} {row.firstName}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}
