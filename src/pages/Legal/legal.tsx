import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const LegalInformation: React.FC = () => {
  return (
    <Container>
      <Box sx={{ padding: '20px' }}>
        <Typography gutterBottom variant="h4">
          Legal Information
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Effective Date: September 3, 2023
        </Typography>

        <Typography gutterBottom variant="h6">
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

        <Typography gutterBottom variant="h6">
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

        <Typography gutterBottom variant="h6">
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
