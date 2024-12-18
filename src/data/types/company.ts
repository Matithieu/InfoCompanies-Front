export type CompanySeen = {
  userId: number
  companyId: number
  status: CheckStatus
}

export type FinancialYear = {
  closingDate1?: string
  turnover1?: number
  result1?: number
  closingDate2?: string
  turnover2?: number
  result2?: number
  closingDate3?: string
  turnover3?: number
  result3?: number
}

export type SocialMedia = {
  instagram: string
  facebook: string
  twitter: string
  linkedin: string
  youtube: string
}

export enum CheckStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
  TO_DO = 'TO_DO',
}

// Todo: Translate
export type Schedule = {
  lundi: string
  mardi: string
  mercredi: string
  jeudi: string
  vendredi: string
  samedi: string
  dimanche: string
}

export type Reviews = {
  stars: number
  numberOfReviews: number
}

export type UserCompanyStatus = {
  id: number
  userId: string
  status: CheckStatus
  companyId: number
}

export type Company = {
  id: number
  companyName: string
  sirenNumber: string
  nicNumber: string
  legalForm: string
  apeCode: string
  address: string
  postalCode: string
  city: string
  region: string
  dateRegistration: string
  deregistrationDate: string
  financialYears: Record<number, FinancialYear>
  industrySector: string
  phoneNumber: string
  website: string
  reviews: Reviews
  schedule: Schedule
  email: string
  scrapingDate: string
  socialMedia: SocialMedia
  companyCategory: string
  numberOfEmployee: number
  lastProcessingDate: string
  dateCreation: string
  userCompanyStatus: UserCompanyStatus
}

export type CompanyWithStatus = {
  company: Company
  userCompanyStatus: UserCompanyStatus
}

export function getTurnOverByYear(company: Company, year: number): number {
  const financialYear = company.financialYears[year]
  if (!financialYear) return 0

  return (
    (financialYear.turnover1 ?? 0) +
    (financialYear.turnover2 ?? 0) +
    (financialYear.turnover3 ?? 0)
  )
}

export function getResultsByYear(company: Company, year: number): number {
  const financialYear = company.financialYears[year]
  if (!financialYear) return 0

  return (
    (financialYear.result1 ?? 0) +
    (financialYear.result2 ?? 0) +
    (financialYear.result3 ?? 0)
  )
}

export type TurnOver = Array<{
  date: number
  amount: number
}>

export function getTotalTurnOver(company: Company) {
  const currentYear = new Date().getFullYear()
  const startYear = 2018
  const turnOver: TurnOver = []

  for (let year = startYear; year <= currentYear; year++) {
    turnOver.push({
      date: year,
      amount: getTurnOverByYear(company, year),
    })
  }

  return turnOver
}
