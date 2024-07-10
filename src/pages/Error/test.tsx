import { useQuery } from '@tanstack/react-query'

import { fetchCompanySeen } from '../../utils/api'

const Test: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['companies-seen'],
    queryFn: () => fetchCompanySeen(),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  })

  if (data) {
    console.log(data)
  } else {
    return 'Please Fetch'
  }
}

export default Test
