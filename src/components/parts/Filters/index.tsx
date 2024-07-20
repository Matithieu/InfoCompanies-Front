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

  return (
    <div>
      <Grid
        container
        alignItems="center"
        maxWidth={800}
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
            handleSelectChange={handleSelectChange('legalStatusValue')}
            label="Status légaux"
            options={legalStatus}
            selectedValues={searchTerm.legalStatusValue}
          />
        </Grid>
        <Grid md={4} sm={6} xs={12}>
          <CustomSelect
            handleSelectChange={handleSelectChange('activityAreaValue')}
            label="Secteur d'activité"
            options={activityArea}
            selectedValues={searchTerm.activityAreaValue}
          />
        </Grid>
        <Grid md={4} sm={6} xs={12}>
          <CustomSelect
            handleSelectChange={handleSelectChange('regionValue')}
            label="Région"
            options={region}
            selectedValues={searchTerm.regionValue}
          />
        </Grid>
        <Grid
          md={4}
          sm={6}
          sx={{ display: 'flex', alignItems: 'center' }}
          xs={12}
        >
          <Button
            style={{ marginBottom: '10px' }}
            variant="soft"
            onClick={handleSearch}
          >
            Rechercher <SearchIcon style={{ marginLeft: '6px' }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Filters
