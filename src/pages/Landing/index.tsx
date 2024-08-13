import { Box, Stack, Typography } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useRef, useState } from 'react'

import TryWithoutCBButton from '../../components/common/buttons/TryWithoutCVButton.tsx'
import Footer from '../../components/pages/footer'
import Filters from '../../components/parts/Filters/index.tsx'
import Subscriptions from '../../components/parts/Subscription/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { LANDING_FILTER_ENDPOINT } from '../../data/types/common.ts'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'
import { fetchCompaniesWithUrlAndPage } from '../../utils/api/index.ts'
import { constructURLWithFilter } from '../../utils/api/util.ts'
import HeaderLanding from '../Landing/components/header.tsx'

import video1 from '/videos/step-1.gif'
import video2 from '/videos/step-2.gif'

const LandingPage: FC = () => {
  const [playedVideo] = useState(1)
  const {
    searchParams: { city, industrySector },
  } = useCompanyFilterStore()
  const [url, setUrl] = useState<string>(`${LANDING_FILTER_ENDPOINT}?`)
  const pricingRef = useRef<HTMLDivElement>(null)
  const produitRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setUrl(
      constructURLWithFilter(
        { city, industrySector, legalForm: [], region: [] },
        `${LANDING_FILTER_ENDPOINT}?`,
      ),
    )
  }, [city, industrySector])

  // Set the filter with something inside
  useEffect(() => {
    if (city.length === 0 && industrySector.length === 0) {
      setUrl(
        constructURLWithFilter(
          {
            region: ['Bretagne'],
            city: [],
            industrySector: [],
            legalForm: [],
          },
          `${LANDING_FILTER_ENDPOINT}?`,
        ),
      )
    }
  }, [])

  const { isPending, data, error } = useQuery({
    queryKey: ['companies', url],
    queryFn: () => fetchCompaniesWithUrlAndPage(url, 0),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
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
                Découvrez des entreprises et prenez contact avec elles
              </Typography>
              <Typography
                color="neutral"
                level="h4"
                sx={{
                  textAlign: 'center',
                }}
              >
                Téléphone, email, réseaux sociaux, chiffres d’affaire,
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
            Vous cherchez à contacter facilement
            <span
              className="gradient-text fancy medium"
              style={{ fontSize: '1.2rem', marginLeft: '5px' }}
            >
              des entreprises ?
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
              Filtrez par ville, effectif, secteur d&apos;activité et plus
              encore
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
              Réseaux sociaux, téléphone, email, chiffre d&apos;affaire,
              dirigeant à portée de clic
            </Typography>
            <TryWithoutCBButton />
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
            Trouvez des entreprises au
            <span
              className="gradient-text fancy medium"
              style={{ fontSize: '1.2rem', marginLeft: '5px' }}
            >
              meilleur prix
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
