import './style.css'

import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'

import CustomSelect from '../../components/common/CustomSelect/index.tsx'
import Seo from '../../components/common/Seo/index.tsx'
import Chart from '../../components/parts/Chart/index.tsx'
import DetailsCompany from '../../components/parts/DetailsCompany/index.tsx'
import ListOfLeaders from '../../components/parts/ListOfLeaders/index.tsx'
import TableCompany from '../../components/parts/TableCompany/index.tsx'
import { activityArea } from '../../data/ListOfOptions/Activity.tsx'
import { legalStatus } from '../../data/ListOfOptions/Legal.tsx'
import { region } from '../../data/ListOfOptions/Region.tsx'
import { useCompanyFilterStore } from '../../store/filtersStore.tsx'

/**
 *
 * @returns Multiple components to filter the list of companies
 */
const AdvancedSearch = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState({
    legalStatusValue: [],
    activityAreaValue: [],
    regionValue: [],
  })

  const { searchParams, setSearchParams } = useCompanyFilterStore()

  useEffect(() => {
    setSearchTerm({
      legalStatusValue: searchParams.legalStatus,
      activityAreaValue: searchParams.activityArea,
      regionValue: searchParams.region,
    })
  }, [searchParams])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleLegalStatusChange = (selectedValue: string[]) => {
    console.log('Legal status changed to:', selectedValue)
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      legalStatusValue: selectedValue as never[],
    }))
  }

  const handleActivityAreaChange = (selectedValue: string[]) => {
    console.log('Activity area changed to:', selectedValue)
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      activityAreaValue: selectedValue as never[],
    }))
  }

  const handleRegionChange = (selectedValue: string[]) => {
    console.log('Region changed to:', selectedValue)
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      regionValue: selectedValue as never[],
    }))
  }

  const handleSearch = () => {
    setSearchParams({
      legalStatus: searchTerm.legalStatusValue as [],
      activityArea: searchTerm.activityAreaValue as [],
      region: searchTerm.regionValue as [],
    })

    // Use the callback function to log the updated state
    setSearchTerm((prevSearchTerm) => {
      console.log('Search term:', prevSearchTerm)
      return prevSearchTerm
    })
  }

  return (
    <div>
      <Button
        style={{ marginBottom: 30, marginTop: 20 }}
        variant="outlined"
        onClick={toggleMenu}
      >
        Recherche avancée
      </Button>
      <div className={`search-menu ${showMenu ? 'show' : ''}`}>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          padding="10px"
          spacing={1}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
          }}
          width="100%"
        >
          <Grid md={4} sm={6} xs={12}>
            <CustomSelect
              key="legal-status"
              handleSelectChange={handleLegalStatusChange}
              label="Status légaux"
              options={legalStatus}
              selectedValues={searchTerm.legalStatusValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <CustomSelect
              key="activity-area"
              handleSelectChange={handleActivityAreaChange}
              label="Secteur d'activité"
              options={activityArea}
              selectedValues={searchTerm.activityAreaValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <CustomSelect
              key="region"
              handleSelectChange={handleRegionChange}
              label="Région"
              options={region}
              selectedValues={searchTerm.regionValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <Button
              style={{ marginTop: '20px' }}
              variant="outlined"
              onClick={() => {
                setSearchTerm({
                  legalStatusValue: [],
                  activityAreaValue: [],
                  regionValue: [],
                })
                setSearchParams({
                  legalStatus: [],
                  activityArea: [],
                  region: [],
                })
              }}
            >
              Réinitialiser
            </Button>

            <span style={{ marginRight: '20px' }}></span>

            <Button
              style={{ marginTop: '20px' }}
              variant="soft"
              onClick={handleSearch}
            >
              Rechercher <SearchIcon style={{ marginLeft: '6px' }} />
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

/**
 *
 * @returns The dashboard page
 */
export default function Dashboard() {
  const { searchParams } = useCompanyFilterStore()
  const [url, setUrl] = useState(`random?`)

  useEffect(() => {
    const changeURL = () => {
      if (
        searchParams.activityArea.length === 0 &&
        searchParams.region.length === 0 &&
        searchParams.legalStatus.length === 0
      ) {
        setUrl('random?')
        return
      }

      setUrl(
        `filter-by-parameters?sector=${searchParams.activityArea}&region=${searchParams.region}&`,
      )
    }

    changeURL()
  }, [searchParams])
  return (
    <Grid>
      <Seo
        description="Dashboard"
        name="Dashboard"
        title="Dashboard"
        type="Dashboard"
      />
      <Box
        sx={{
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography component="h1" level="h1" style={{ marginTop: 20 }}>
          Dashboard
        </Typography>
      </Box>

      <Grid lg={3} md={4} paddingLeft={8} sm={6} xs={12}>
        <AdvancedSearch
          key={
            searchParams.activityArea.length +
            searchParams.region.length +
            searchParams.legalStatus.length
          }
        />
      </Grid>

      <Grid
        container
        display="flex"
        justifyContent="center"
        paddingLeft={10}
        paddingRight={10}
        spacing={3}
      >
        {/* Container on the first row */}
        <Grid lg={6} md={8} sm={6} xs={1}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minWidth: '100%',
              height: '100%',
              minHeight: 550,
              maxHeight: 550,
              borderRadius: 3,
            }}
          >
            <TableCompany url={url} />
          </Stack>
        </Grid>

        {/* Container on the second row */}
        <Grid
          container
          aria-label="tabs"
          justifyContent="center"
          sm={6}
          spacing={3}
          xs={12}
        >
          {/* DetailsCompany of the company */}
          <Grid md={4} sm={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                minWidth: 400,
                overflow: 'hidden',
              }}
            >
              <DetailsCompany />
            </Card>
          </Grid>

          {/* Leaders of the company */}
          <Grid md={4} sm={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 220,
                minWidth: 400,
              }}
            >
              <ListOfLeaders />
            </Card>
          </Grid>

          {/* Chart of the company */}
          <Grid md={4} sm={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 220,
                minWidth: 400,
              }}
            >
              <Chart />
            </Card>
          </Grid>
          {/* . */}
        </Grid>
      </Grid>
    </Grid>
  )
}
