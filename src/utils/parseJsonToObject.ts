import {
  CheckStatus,
  Company,
  FinancialYear,
  Reviews,
  Schedule,
  UserCompanyStatus,
} from '../data/types/company'
import { User } from '../data/types/index.types'

// https://github.com/typestack/class-transformer
// use this library to transform json to class ??

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export interface JSONObject {
  [x: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

export function parseJsonToCompany(
  company: JSONObject,
  userCompanyStatus: UserCompanyStatus,
) {
  try {
    return {
      id: company.id,
      companyName: company.companyName,
      sirenNumber: company.sirenNumber,
      nicNumber: company.nicNumber,
      legalForm: company.legalForm,
      apeCode: company.apeCode,
      address: company.address,
      postalCode: company.postalCode,
      city: company.city,
      region: company.region,
      dateRegistration: company.registrationDate,
      deregistrationDate: company.deregistrationDate,
      financialYears: {
        2018: parseJsonToFinancialYear(company, 2018),
        2019: parseJsonToFinancialYear(company, 2019),
        2020: parseJsonToFinancialYear(company, 2020),
        2021: parseJsonToFinancialYear(company, 2021),
        2022: parseJsonToFinancialYear(company, 2022),
        2023: parseJsonToFinancialYear(company, 2023),
      },
      industrySector: company.industrySector,
      phoneNumber: company.phoneNumber,
      website: company.website,
      reviews: parseJsonToReviews(company),
      schedule: parseJsonToSchedule(company),
      email: company.email,
      scrapingDate: company.scrapingDate,
      socialMedia: {
        facebook: company.facebook,
        twitter: company.twitter,
        linkedin: company.linkedin,
        instagram: company.instagram,
        youtube: company.youtube,
      },
      companyCategory: company.companyCategory,
      numberOfEmployee: company.numberOfEmployee,
      lastProcessingDate: company.lastProcessingDate,
      dateCreation: company.dateCreation,
      userCompanyStatus: userCompanyStatus,
    } as Company
  } catch (e) {
    throw new Error('Error converting company JSON to company object: ' + e)
  }
}

export const parseJsonToUserCompanyStatus = (userCompanyStatus: JSONObject) => {
  // Data returned is an array because of the OneToMany relationship
  if (userCompanyStatus === null || userCompanyStatus === undefined)
    return {
      id: 0,
      userId: '',
      companyId: 0,
      status: CheckStatus.NOT_DONE,
    } as UserCompanyStatus

  try {
    return {
      id: userCompanyStatus.id,
      userId: userCompanyStatus.userId,
      companyId: userCompanyStatus.companyId,
      status: userCompanyStatus.status,
    } as UserCompanyStatus
  } catch (e) {
    throw new Error(
      'Error converting user company status JSON to user company status object: ' +
        e,
    )
  }
}

export const parseJsonToFinancialYear = (
  companyObj: JSONObject,
  year: number,
) => {
  try {
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
  } catch (error) {
    throw new Error(
      'Error converting financial year JSON to financial year object: ' + error,
    )
  }
}

export const parseJsonToSchedule = (companyObj: JSONObject) => {
  try {
    if (companyObj.schedule === null || companyObj.schedule === undefined)
      return null
    const scheduleJson = JSON.parse(companyObj.schedule as string)

    return {
      lundi: scheduleJson['lundi'],
      mardi: scheduleJson['mardi'],
      mercredi: scheduleJson['mercredi'],
      jeudi: scheduleJson['jeudi'],
      vendredi: scheduleJson['vendredi'],
      samedi: scheduleJson['samedi'],
      dimanche: scheduleJson['dimanche'],
    } as Schedule
  } catch (error) {
    console.error('Error converting schedule JSON to schedule object: ' + error)
    throw new Error(
      'Error converting schedule JSON to schedule object: ' + error,
    )
  }
}

export function parseJsonToReviews(companyObj: JSONObject) {
  try {
    if (companyObj.reviews === null || companyObj.reviews === undefined)
      return null
    const reviewsJson = JSON.parse(companyObj.reviews as string)

    return {
      stars: reviewsJson.stars,
      numberOfReviews: reviewsJson.number_of_reviews,
    } as Reviews
  } catch (e) {
    throw new Error('Error converting reviews JSON to reviews object: ' + e)
  }
}

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
      hasCompletedOnboarding: userObjs.hasCompletedOnboarding,
    } as User
  } catch (e) {
    throw new Error('Error converting user JSON to user object: ' + e)
  }
}
