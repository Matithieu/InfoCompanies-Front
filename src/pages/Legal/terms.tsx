import React from 'react'
import { Container, Typography, Box } from '@mui/material'

const TermsAndConditions: React.FC = () => {
  return (
    <Container>
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Conditions Générales d'Utilisation
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Date d'entrée en vigueur : 3 septembre 2023
        </Typography>
        <Typography paragraph>
          Ces Conditions Générales d'Utilisation ("Conditions") régissent votre
          utilisation du site web situé à l'adresse infocompanies.com (le
          "Site"), fourni par mat ("mat," "nous," "notre," ou "nos"). En
          accédant ou en utilisant le Site, vous acceptez de vous conformer à
          ces Conditions et d'être lié par celles-ci. Si vous n'acceptez pas ces
          Conditions, veuillez ne pas utiliser le Site.
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Utilisation du Site
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1.1. Accès
        </Typography>
        <Typography paragraph>
          Vous devez avoir au moins 18 ans pour accéder et utiliser le Site. En
          utilisant le Site, vous déclarez et garantissez que vous êtes majeur.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1.2. Compte
        </Typography>
        <Typography paragraph>
          Certaines fonctionnalités du Site peuvent nécessiter la création d'un
          compte. Vous êtes responsable de la confidentialité de vos
          informations de compte et de toutes les activités effectuées sous
          votre compte.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1.3. Activités Interdites
        </Typography>
        <Typography paragraph>
          Vous acceptez de ne pas utiliser le Site à des fins illégales ou non
          autorisées. Vous ne pouvez pas :
        </Typography>
        <ul>
          <li>Violer les lois ou règlements applicables.</li>
          <li>
            Enfreindre les droits d'autrui, y compris les droits de propriété
            intellectuelle.
          </li>
          <li>
            Distribuer du spam ou engager toute forme d'activité malveillante.
          </li>
        </ul>
        <Typography variant="h6" gutterBottom>
          2. Confidentialité
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          2.1. Politique de Confidentialité
        </Typography>
        <Typography paragraph>
          Votre utilisation du Site est également régie par notre Politique de
          Confidentialité, disponible à l'adresse
          https://infocompanies.com/privacy. Veuillez consulter notre Politique
          de Confidentialité pour comprendre comment nous collectons, utilisons
          et protégeons vos informations personnelles.
        </Typography>
        <Typography variant="h6" gutterBottom>
          3. Propriété Intellectuelle
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          3.1. Propriété
        </Typography>
        <Typography paragraph>
          Tout le contenu du Site, y compris mais sans s'y limiter, les textes,
          graphiques, logos, images et logiciels, est la propriété de mat et est
          protégé par les lois sur le droit d'auteur et autres lois sur la
          propriété intellectuelle.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          3.2. Utilisation du Contenu
        </Typography>
        <Typography paragraph>
          Vous ne pouvez pas reproduire, distribuer, modifier ou créer des
          œuvres dérivées de tout contenu du Site sans notre consentement écrit
          préalable.
        </Typography>
        <Typography variant="h6" gutterBottom>
          4. Décharge de Garantie
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.1. Absence de Garantie
        </Typography>
        <Typography paragraph>
          Le Site est fourni "en l'état" et "selon disponibilité". Nous ne
          faisons aucune déclaration ni garantie quant à l'exactitude, la
          complétude ou la fiabilité du contenu du Site.
        </Typography>
        <Typography variant="h6" gutterBottom>
          5. Limitation de Responsabilité
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          5.1. Limitation
        </Typography>
        <Typography paragraph>
          mat et ses affiliés, dirigeants, employés et agents ne seront pas
          responsables de tout dommage indirect, incident, spécial, consécutif
          ou punitif, ou de toute perte de profits ou de revenus, qu'ils soient
          encourus directement ou indirectement.
        </Typography>
        <Typography variant="h6" gutterBottom>
          6. Résiliation
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          6.1. Résiliation
        </Typography>
        <Typography paragraph>
          Nous nous réservons le droit de résilier ou de suspendre votre accès
          au Site à notre seule discrétion, sans préavis et pour toute raison, y
          compris mais sans s'y limiter, votre violation de ces Conditions.
        </Typography>
        <Typography variant="h6" gutterBottom>
          7. Droit Applicable
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          7.1. Droit Applicable
        </Typography>
        <Typography paragraph>
          Ces Conditions sont régies et interprétées conformément aux lois de la
          France.
        </Typography>
        <Typography variant="h6" gutterBottom>
          8. Coordonnées
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          8.1. Contactez-nous
        </Typography>
        <Typography paragraph>
          Si vous avez des questions ou des préoccupations concernant ces
          Conditions, veuillez nous contacter à l'adresse
          contact@infocompanies.com.
        </Typography>
        <Typography paragraph>
          En utilisant le Site, vous reconnaissez avoir lu, compris et accepté
          d'être lié par ces Conditions et notre Politique de Confidentialité.
        </Typography>
      </Box>
    </Container>
  )
}

export default TermsAndConditions
