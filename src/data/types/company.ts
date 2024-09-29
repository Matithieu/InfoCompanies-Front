export type FinancialYear = {
  closingDate1: string
  turnover1: number
  result1: number
  closingDate2: string
  turnover2: number
  result2: number
  closingDate3: string
  turnover3: number
  result3: number
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
  checked: CheckStatus
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
}

export function getTurnOverByYear(company: Company, year: number): number {
  return (
    company.financialYears[year].turnover1 +
    company.financialYears[year].turnover2 +
    company.financialYears[year].turnover3
  )
}

export function getResultsByYear(company: Company, year: number): number {
  return (
    company.financialYears[year].result1 +
    company.financialYears[year].result2 +
    company.financialYears[year].result3
  )
}

export type TurnOver = {
  date: number[]
  turnOver: number[]
}

export function getTotalOfTurnOver(company: Company): TurnOver {
  const turnOver = {
    date: [2018, 2019, 2020, 2021, 2022, 2023],
    turnOver: [
      getTurnOverByYear(company, 2018),
      getTurnOverByYear(company, 2019),
      getTurnOverByYear(company, 2020),
      getTurnOverByYear(company, 2021),
      getTurnOverByYear(company, 2022),
      getTurnOverByYear(company, 2023),
    ],
  }

  return turnOver
}
