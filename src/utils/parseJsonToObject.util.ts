// https://github.com/typestack/class-transformer
// use this library to transform json to class ??

import { Reviews, Schedule } from '@/types/index.types'

type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export interface JSONObject {
  [x: string]: JSONValue
}

export const parseJsonToSchedule = (companyObj: JSONObject) => {
  try {
    if (companyObj.schedule === null || companyObj.schedule === undefined)
      return null
    const scheduleJson = JSON.parse(companyObj.schedule as string)

    return {
      monday: scheduleJson['lundi'],
      tuesday: scheduleJson['mardi'],
      wednesday: scheduleJson['mercredi'],
      thursday: scheduleJson['jeudi'],
      friday: scheduleJson['vendredi'],
      saturday: scheduleJson['samedi'],
      sunday: scheduleJson['dimanche'],
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
