import { CheckStatus } from './company'

export type CompanySeen = {
  userId: number
  companyId: number
  status: CheckStatus
}
