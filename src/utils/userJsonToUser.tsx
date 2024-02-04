// https://github.com/typestack/class-transformer
// use this library to transform json to class ??

import { User } from "../data/Account/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function userJsonToUser(companyObj: any) {
  return new User(
    companyObj.id,
    companyObj.name,
    companyObj.email,
    companyObj.password,
    companyObj.phone,
    companyObj.city,
    companyObj.address,
    companyObj.roles,
    companyObj.verified,
    companyObj.companySeen,
    companyObj.enabled,
    companyObj.username,
    companyObj.authorities,
    companyObj.accountNonExpired,
    companyObj.accountNonLocked,
    companyObj.credentialsNonExpired
  );
}
