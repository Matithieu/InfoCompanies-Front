import { Box, Stack, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useRef, useState } from 'react'

import TryWithoutCBButton from '../../components/common/Buttons/TryWithoutCVButton.tsx'
import Footer from '../../components/pages/footer'
import Filters from '../../components/parts/Filters/index.tsx'
import Subscriptions from '../../components/parts/Subscription/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { columnsTableCompany } from '../../data/types/columns.ts'
import { LANDING_FILTER_ENDPOINT } from '../../data/types/index.types.ts'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/queries.ts'
import { constructURLWithFilter } from '../../utils/api/utils.ts'
import HeaderLanding from './components/LandingHeader.tsx'

import video1 from '/videos/step-1.gif'
import video2 from '/videos/step-2.gif'

const LandingPage: FC = () => {
  const [playedVideo] = useState(1)
  const {
    searchParams: { city, industrySector },
  } = useCompanyFilterStore()
  const [url, setUrl] = useState<string | undefined>(undefined)
  const pricingRef = useRef<HTMLDivElement>(null)
  const produitRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    let newUrl = ''

    if (city.length === 0 && industrySector.length === 0) {
      // Default filter when no city or industry sector is selected
      newUrl = constructURLWithFilter(
        {
          region: ['Bretagne'],
          city: [],
          industrySector: [],
          legalForm: [],
          employee: { amount: undefined, comparator: undefined },
          socials: [],
          contact: [],
          isCompanySeen: false,
        },
        `${LANDING_FILTER_ENDPOINT}?`,
      )
    } else {
      // Construct URL based on selected city and industry sector
      newUrl = constructURLWithFilter(
        {
          city,
          industrySector,
          legalForm: [],
          region: [],
          employee: { amount: undefined, comparator: undefined },
          socials: [],
          contact: [],
          isCompanySeen: false,
        },
        `${LANDING_FILTER_ENDPOINT}?`,
      )
    }

    // Update the URL state only if it has changed
    if (url !== newUrl) {
      setUrl(newUrl)
    }
  }, [city, industrySector])

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', url],
    queryFn: () => fetchCompaniesWithUrlAndPage(url!, 0, false),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!url,
  })

  return (
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <HeaderLanding
        pricingRef={pricingRef}
        produitRef={produitRef}
        scrollToSection={scrollToSection}
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1150px',
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box sx={{ mt: { xs: 4, md: 10 }, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              level="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            >
              Prospectez sans effort
            </Typography>
          </Box>

          <Box sx={{ mt: { xs: 3, md: 5 } }}>
            <Stack alignItems="center" direction="column" spacing={2}>
              <Typography
                color="neutral"
                level="h4"
                sx={{
                  textAlign: 'center',
                }}
              >
                Découvrez et contactez instantanément les entreprises
              </Typography>
              <Typography
                color="neutral"
                level="h4"
                sx={{
                  textAlign: 'center',
                }}
              >
                Téléphone, e-mail, réseaux sociaux, chiffre d’affaires,
                dirigeants, effectif en un clic
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Box
            aria-label="Filters"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Filters
              filtersToShow={['city', 'industrySector']}
              showAddFilterButton={false}
            />
          </Box>

          <Box
            aria-label="table-scrap"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
              alignItems: 'center',
              flexDirection: 'column',
              maxHeight: 500,
            }}
          >
            <TableCompany
              columns={columnsTableCompany}
              data={data}
              error={error}
              handleChangePage={() => {}}
              handleDetailsClick={() => {}}
              isCheckboxVisible={false}
              isPagination={false}
              isPending={isPending}
            />
          </Box>
        </Box>

        <Box ref={produitRef} sx={{ mt: 5, textAlign: 'center' }}>
          <Typography fontSize="1.2rem">
            Vous cherchez à joindre facilement des entreprises ?<br />
            <span
              className="gradient-text fancy medium"
              style={{ fontSize: '1.2rem', marginLeft: '5px' }}
            >
              Vous êtes au bon endroit !
            </span>
          </Typography>
        </Box>

        {/* First Steps Box */}

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lg: 'row' },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom component="h2" level="h4">
              Prospectez efficacement
            </Typography>
            <Typography gutterBottom>
              Affinez vos recherches avec des filtres puissants : ville,
              effectif, secteur d&apos;activité et bien plus encore.
            </Typography>
            <TryWithoutCBButton />
          </Box>
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            {playedVideo === 1 && (
              <img
                alt="Démonstration étape 1"
                loading="lazy"
                src={video1}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
            {playedVideo === 2 && (
              <img
                alt="Démonstration étape 2"
                loading="lazy"
                src={video2}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>
        </Box>

        {/* Second Steps Box */}

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lg: 'row' },
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            {playedVideo === 1 && (
              <img
                alt="Démonstration étape 1"
                loading="lazy"
                src={video1}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
            {playedVideo === 2 && (
              <img
                alt="Démonstration étape 2"
                loading="lazy"
                src={video2}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom component="h2" level="h4">
              Contactez les entreprises sans effort
            </Typography>
            <Typography gutterBottom>
              Réseaux sociaux, téléphone, e-mail, chiffre d&apos;affaire,
              dirigeant à portée de clic
            </Typography>
          </Box>
        </Box>

        <div style={{ marginTop: '50px' }} />

        {/* Video to present */}

        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography fontSize="1.2rem">Vous êtes au</Typography>
              <span
                className="gradient-text fancy medium"
                style={{ fontSize: '1.2rem', marginLeft: '5px' }}
              >
                bon endroit
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '10px' }} />

        <div
          style={{
            width: '70%',
            margin: '0 auto',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          <img alt="Step 2" loading="lazy" src={video2} />
        </div>

        <div style={{ marginTop: '50px' }} />

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography fontSize="1.2rem">
            La prospection n&apos;a jamais été aussi simple.
            <br />
            <span
              className="gradient-text fancy medium"
              style={{ fontSize: '1.2rem', marginLeft: '5px' }}
            >
              Commencez dès aujourd&apos;hui !
            </span>
          </Typography>
        </Box>

        <div
          ref={pricingRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Subscriptions />
        </div>

        <Box sx={{ mt: 10 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default LandingPage
