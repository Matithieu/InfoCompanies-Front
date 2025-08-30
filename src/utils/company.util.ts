import { CompanyDTO, Year } from '@/types/index.types'

export function getTurnOverByYear(company: CompanyDTO, year: Year): number {
  const financialPeriods = company.financialPeriods.filter(
    (period) => period.year === year,
  )

  return financialPeriods.reduce(
    (total, period) => total + (period.turnover ?? 0),
    0,
  )
}

export function getResultsByYear(company: CompanyDTO, year: Year): number {
  const financialPeriods = company.financialPeriods.filter(
    (period) => period.year === year,
  )

  if (financialPeriods.length === 0) return 0
  const resultSum = financialPeriods.reduce(
    (total, period) => total + (period.revenue ?? 0),
    0,
  )

  return resultSum
}

export type TurnOver = Array<{
  year: Year
  amount: number
}>

export function getTotalTurnOver(company: CompanyDTO) {
  const currentYear = new Date().getFullYear()
  const startYear = 2018
  const turnOver: TurnOver = []

  for (let year = startYear; year <= currentYear; year++) {
    const yearString = `Y${year}` as Year
    turnOver.push({
      year: yearString,
      amount: getTurnOverByYear(company, yearString),
    })
  }

  return turnOver
}
