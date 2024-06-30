import { User } from '../data/types/user'

export function loadCompaniesFilterFromLocalStorage(key: string) {
  const companiesFilter = localStorage.getItem(key)

  if (!companiesFilter) {
    return {}
  }

  try {
    const companyFilterObjs = JSON.parse(companiesFilter)
    return companyFilterObjs
  } catch (error) {
    console.error('Error parsing companies filters from localStorage', error)
    return {}
  }
}

// Key is "authUser"
export function loadUserFromLocalStorage(key: string) {
  const userData = localStorage.getItem(key)

  if (userData === null || !userData || userData === '') {
    localStorage.removeItem(key)
    return null
  }

  if (userData !== 'undefined') {
    const userObjs = JSON.parse(userData)

    if (userObjs !== undefined) {
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
    }
  } else {
    return null
  }
}
