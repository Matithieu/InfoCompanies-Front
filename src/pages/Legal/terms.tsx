import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const TermsAndConditions: React.FC = () => {
  return (
    <Container>
      <Box sx={{ padding: '20px' }}>
        <Typography gutterBottom variant="h4">
          Conditions Générales d&#39;Utilisation
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Date d&#39;entrée en vigueur : 3 septembre 2023
        </Typography>
        <Typography paragraph>
          Ces Conditions Générales d&#39;Utilisation (&quot;Conditions&quot;)
          régissent votre utilisation du site web situé à l&#39;adresse
          infocompanies.com (le &quot;Site&quot;), fourni par mat
          (&quot;mat,&quot; &quot;nous,&quot; &quot;notre,&quot; ou
          &quot;nos&quot;). En accédant ou en utilisant le Site, vous acceptez
          de vous conformer à ces Conditions et d&#39;être lié par celles-ci. Si
          vous n&#39;acceptez pas ces Conditions, veuillez ne pas utiliser le
          Site.
        </Typography>
        <Typography gutterBottom variant="h6">
          1. Utilisation du Site
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          1.1. Accès
        </Typography>
        <Typography paragraph>
          Vous devez avoir au moins 18 ans pour accéder et utiliser le Site. En
          utilisant le Site, vous déclarez et garantissez que vous êtes majeur.
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          1.2. Compte
        </Typography>
        <Typography paragraph>
          Certaines fonctionnalités du Site peuvent nécessiter la création
          d&#39;un compte. Vous êtes responsable de la confidentialité de vos
          informations de compte et de toutes les activités effectuées sous
          votre compte.
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          1.3. Activités Interdites
        </Typography>
        <Typography paragraph>
          Vous acceptez de ne pas utiliser le Site à des fins illégales ou non
          autorisées. Vous ne pouvez pas :
        </Typography>
        <ul>
          <li>Violer les lois ou règlements applicables.</li>
          <li>
            Enfreindre les droits d&#39;autrui, y compris les droits de
            propriété intellectuelle.
          </li>
          <li>
            Distribuer du spam ou engager toute forme d&#39;activité
            malveillante.
          </li>
        </ul>
        <Typography gutterBottom variant="h6">
          2. Confidentialité
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          2.1. Politique de Confidentialité
        </Typography>
        <Typography paragraph>
          Votre utilisation du Site est également régie par notre Politique de
          Confidentialité, disponible à l&#39;adresse
          https://infocompanies.com/privacy. Veuillez consulter notre Politique
          de Confidentialité pour comprendre comment nous collectons, utilisons
          et protégeons vos informations personnelles.
        </Typography>
        <Typography gutterBottom variant="h6">
          3. Propriété Intellectuelle
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          3.1. Propriété
        </Typography>
        <Typography paragraph>
          Tout le contenu du Site, y compris mais sans s&#39;y limiter, les
          textes, graphiques, logos, images et logiciels, est la propriété de
          mat et est protégé par les lois sur le droit d&#39;auteur et autres
          lois sur la propriété intellectuelle.
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          3.2. Utilisation du Contenu
        </Typography>
        <Typography paragraph>
          Vous ne pouvez pas reproduire, distribuer, modifier ou créer des
          œuvres dérivées de tout contenu du Site sans notre consentement écrit
          préalable.
        </Typography>
        <Typography gutterBottom variant="h6">
          4. Décharge de Garantie
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          4.1. Absence de Garantie
        </Typography>
        <Typography paragraph>
          Le Site est fourni &quot;en l&#39;état&quot; et &quot;selon
          disponibilité&quot;. Nous ne faisons aucune déclaration ni garantie
          quant à l&#39;exactitude, la complétude ou la fiabilité du contenu du
          Site.
        </Typography>
        <Typography gutterBottom variant="h6">
          5. Limitation de Responsabilité
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          5.1. Limitation
        </Typography>
        <Typography paragraph>
          mat et ses affiliés, dirigeants, employés et agents ne seront pas
          responsables de tout dommage indirect, incident, spécial, consécutif
          ou punitif, ou de toute perte de profits ou de revenus, qu&#39;ils
          soient encourus directement ou indirectement.
        </Typography>
        <Typography gutterBottom variant="h6">
          6. Résiliation
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          6.1. Résiliation
        </Typography>
        <Typography paragraph>
          Nous nous réservons le droit de résilier ou de suspendre votre accès
          au Site à notre seule discrétion, sans préavis et pour toute raison, y
          compris mais sans s&#39;y limiter, votre violation de ces Conditions.
        </Typography>
        <Typography gutterBottom variant="h6">
          7. Droit Applicable
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          7.1. Droit Applicable
        </Typography>
        <Typography paragraph>
          Ces Conditions sont régies et interprétées conformément aux lois de la
          France.
        </Typography>
        <Typography gutterBottom variant="h6">
          8. Coordonnées
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          8.1. Contactez-nous
        </Typography>
        <Typography paragraph>
          Si vous avez des questions ou des préoccupations concernant ces
          Conditions, veuillez nous contacter à l&#39;adresse
          contact@infocompanies.com.
        </Typography>
        <Typography paragraph>
          En utilisant le Site, vous reconnaissez avoir lu, compris et accepté
          d&#39;être lié par ces Conditions et notre Politique de
          Confidentialité.
        </Typography>
      </Box>
    </Container>
  )
}

export default TermsAndConditions
