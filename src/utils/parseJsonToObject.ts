import { CheckStatus, Company, FinancialYear } from '../data/types/company'
import { User } from '../data/types/user'

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export interface JSONObject {
  [x: string]: JSONValue
}

export function parseJsonToCompany(companyObj: JSONObject) {
  try {
    return {
      id: companyObj.id,
      companyName: companyObj.companyName,
      sirenNumber: companyObj.sirenNumber,
      nicNumber: companyObj.nicNumber,
      legalForm: companyObj.legalForm,
      apeCode: companyObj.apeCode,
      address: companyObj.address,
      postalCode: companyObj.postalCode,
      city: companyObj.city,
      region: companyObj.region,
      dateRegistration: companyObj.registrationDate,
      deregistrationDate: companyObj.deregistrationDate,
      checked: CheckStatus.NOT_DONE,
      financialYears: {
        2018: parseJsonToFinancialYear(companyObj, 2018),
        2019: parseJsonToFinancialYear(companyObj, 2019),
        2020: parseJsonToFinancialYear(companyObj, 2020),
        2021: parseJsonToFinancialYear(companyObj, 2021),
        2022: parseJsonToFinancialYear(companyObj, 2022),
        2023: parseJsonToFinancialYear(companyObj, 2023),
      },
      industrySector: companyObj.industrySector,
      phoneNumber: companyObj.phoneNumber,
      website: companyObj.website,
      reviews: companyObj.reviews,
      schedule: companyObj.schedule,
      email: companyObj.email,
      scrapingDate: companyObj.scrapingDate,
      socialMedia: {
        facebook: companyObj.facebook,
        twitter: companyObj.twitter,
        linkedin: companyObj.linkedin,
        instagram: companyObj.instagram,
        youtube: companyObj.youtube,
      },
    } as Company
  } catch (e) {
    console.error('Error converting company JSON to company object: ' + e)
    return null
  }
}

export const parseJsonToFinancialYear = (
  companyObj: any,
  year: number,
): FinancialYear => {
  return {
    closingDate1: companyObj[`closingDate_${year}_1`],
    turnover1: companyObj[`revenue_${year}_1`],
    result1: companyObj[`turnover_${year}_1`],
    closingDate2: companyObj[`closingDate_${year}_2`],
    turnover2: companyObj[`revenue_${year}_2`],
    result2: companyObj[`turnover_${year}_2`],
    closingDate3: companyObj[`closingDate_${year}_3`],
    turnover3: companyObj[`revenue_${year}_3`],
    result3: companyObj[`turnover_${year}_3`],
  } as FinancialYear
}

// https://github.com/typestack/class-transformer
// use this library to transform json to class ??

export function parseJsonToUser(userObjs: JSONObject) {
  try {
    return {
      id: userObjs.id,
      firstName: userObjs.firstName,
      lastName: userObjs.lastName,
      email: userObjs.email,
      userName: userObjs.userName,
      password: userObjs.password,
      quota: userObjs.quota,
      phone: userObjs.phone,
      street: userObjs.street,
      locality: userObjs.locality,
      region: userObjs.region,
      postalCode: userObjs.postalCode,
      country: userObjs.country,
      tier: userObjs.tier,
      isVerified: userObjs.verified,
    } as User
  } catch (e) {
    new Error('Error converting user JSON to user object: ' + e)
    return null
  }
}
