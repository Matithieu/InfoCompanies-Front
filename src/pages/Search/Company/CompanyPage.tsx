import 'react-toastify/dist/ReactToastify.css'

import LoadingText from '@/components/common/Loading/TextLoading'
import { useUpdateStatus } from '@/pages/Dashboard/hooks/useUpdateStatus'
import {
  CheckStatus,
  CompanyDTO,
  CompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { Box, Card, Grid } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { GlobalErrorButton } from '../../../components/common/Buttons/GlobalErrorButton'
import ScrapCompanyButton from '../../../components/common/Buttons/scrapCompanyButton'
import Chart from '../../../components/parts/Chart/Chart'
import DetailsCompany from '../../../components/parts/DetailsCompany/index'
import ListOfLeaders from '../../../components/parts/LeaderList/LeaderList'
import { fetchCompanyById } from '../../../utils/api/queries'
import { asserts, isNotNU } from '../../../utils/assertion.util'
import CompanyHeader from './components/CompanyHeader'

const CompanyPage: FC = () => {
  const { companyId } = useParams()
  asserts(isNotNU(companyId), 'companyId is undefined')
  const [companiesDtoWithStatusDTO, setCompaniesDtoWithStatusDTO] = useState<
    CompanyDtoWithStatusDTO | undefined
  >()

  const { isPending, data, error } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompanyById({ id: Number(companyId) }),
  })

  useEffect(() => {
    if (data) setCompaniesDtoWithStatusDTO(data)
  }, [data, setCompaniesDtoWithStatusDTO])

  const updateStatusMutation = useUpdateStatus({
    updateCompanyData: setCompaniesDtoWithStatusDTO,
  })

  const handleStatusChange = async (
    companyDTO: CompanyDTO,
    newStatus: CheckStatus,
  ) => {
    updateStatusMutation.mutate({ companyDTO, status: newStatus })
  }

  if (error !== null) {
    return <GlobalErrorButton error={error} />
  }

  if (isPending || companiesDtoWithStatusDTO === undefined) {
    return <LoadingText />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <CompanyHeader
          companyDTOWithStatusDTO={companiesDtoWithStatusDTO}
          handleStatusChange={handleStatusChange}
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ScrapCompanyButton
            company={companiesDtoWithStatusDTO.companyDTO}
            onScraped={(updatedCompany) =>
              setCompaniesDtoWithStatusDTO((prevState) =>
                prevState
                  ? {
                      ...prevState,
                      companyDTO: updatedCompany,
                    }
                  : undefined,
              )
            }
          />
        </div>

        <div style={{ marginTop: '100px' }} />

        <Grid
          container
          direction="row"
          display="flex"
          justifyContent="center"
          spacing={2}
        >
          <Grid lg={5} md={5} sm={8} xl={8} xs={8}>
            <Card sx={{ minHeight: 220 }}>
              <DetailsCompany company={companiesDtoWithStatusDTO.companyDTO} />
            </Card>
          </Grid>

          <Grid lg={5} md={5} sm={8} xl={8} xs={8}>
            <Card sx={{ minHeight: 220 }}>
              <ListOfLeaders
                siren={companiesDtoWithStatusDTO.companyDTO.sirenNumber}
              />
            </Card>
          </Grid>

          <Grid lg={5} md={5} sm={8} xl={8} xs={8}>
            <Card
              sx={{
                height: 220,
                minWidth: 1,
              }}
            >
              <Chart company={companiesDtoWithStatusDTO.companyDTO} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CompanyPage
