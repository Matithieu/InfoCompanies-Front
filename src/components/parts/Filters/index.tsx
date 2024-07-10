import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid } from '@mui/joy'
import { FC, useEffect, useState } from 'react'

import { activityArea } from '../../../data/ListOfOptions/Activity'
import { legalStatus } from '../../../data/ListOfOptions/Legal'
import { region } from '../../../data/ListOfOptions/Region'
import { useCompanyFilterStore } from '../../../store/filtersStore'
import CustomSelect from '../../common/CustomSelect'

interface SearchTerm {
  legalStatusValue: string[]
  activityAreaValue: string[]
  regionValue: string[]
}

const Filters: FC = () => {
  const { searchParams, setSearchParams } = useCompanyFilterStore()

  const [showMenu, setShowMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    legalStatusValue: [],
    activityAreaValue: [],
    regionValue: [],
  })

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

  const handleSelectChange =
    (field: keyof SearchTerm) => (selectedValue: string[]) => {
      setSearchTerm((prevSearchTerm) => ({
        ...prevSearchTerm,
        [field]: selectedValue,
      }))
    }

  const handleSearch = () => {
    setSearchParams({
      legalStatus: searchTerm.legalStatusValue,
      activityArea: searchTerm.activityAreaValue,
      region: searchTerm.regionValue,
    })
  }

  const handleReset = () => {
    const resetValues = {
      legalStatusValue: [],
      activityAreaValue: [],
      regionValue: [],
    }
    setSearchTerm(resetValues)
    setSearchParams({
      legalStatus: [],
      activityArea: [],
      region: [],
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
              handleSelectChange={handleSelectChange('legalStatusValue')}
              label="Status légaux"
              options={legalStatus}
              selectedValues={searchTerm.legalStatusValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <CustomSelect
              key="activity-area"
              handleSelectChange={handleSelectChange('activityAreaValue')}
              label="Secteur d'activité"
              options={activityArea}
              selectedValues={searchTerm.activityAreaValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <CustomSelect
              key="region"
              handleSelectChange={handleSelectChange('regionValue')}
              label="Région"
              options={region}
              selectedValues={searchTerm.regionValue}
            />
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <Button
              style={{ marginTop: '20px' }}
              variant="outlined"
              onClick={handleReset}
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

export default Filters
