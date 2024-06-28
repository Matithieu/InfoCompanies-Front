import React from 'react'
import { Container, Typography, Box } from '@mui/material'

const LegalInformation: React.FC = () => {
  return (
    <Container>
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Legal Information
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Effective Date: September 3, 2023
        </Typography>

        <Typography variant="h6" gutterBottom>
          Website Editor
        </Typography>
        <Typography paragraph>
          The website infocompanies.com is edited by:
        </Typography>
        <Typography paragraph>
          Social denomination: Mathieu
          <br />
          Legal status:
          <br />
          Share capital:
          <br />
          Head office: in redaction
          <br />
          RCS:
          <br />
          Siret:
          <br />
          VAT number:
        </Typography>

        <Typography variant="h6" gutterBottom>
          Publication Director
        </Typography>
        <Typography paragraph>
          The website infocompanies.com is published by:
        </Typography>
        <Typography paragraph>
          Physical person: Mathieu
          <br />
          Status: Director
          <br />
          Head office: in redaction
          <br />
          Email:
        </Typography>

        <Typography variant="h6" gutterBottom>
          Website Hosting
        </Typography>
        <Typography paragraph>
          The website infocompanies.com is hosted by:
        </Typography>
        <Typography paragraph>
          Social denomination:
          <br />
          Head office:
        </Typography>
      </Box>
    </Container>
  )
}

export default LegalInformation
