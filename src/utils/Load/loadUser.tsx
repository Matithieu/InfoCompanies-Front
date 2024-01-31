import { User } from "../../data/Account/user";

// Key is "authUser"
export function LoadUserFromLocalStorage(key: string) {
  const userData = localStorage.getItem(key);
  if (userData === null || !userData || userData === "") {
    console.log("No user data found");
    return null;
  }

  console.log("User data found: " + userData);

  if (userData != "undefined") {
    const userObjs = JSON.parse(userData);
    if (userObjs != undefined) {
      console.log("User data format is valid");
      return new User(
        userObjs.id,
        userObjs.name,
        userObjs.email,
        userObjs.password,
        userObjs.phone,
        userObjs.city,
        userObjs.address,
        userObjs.roles,
        userObjs.verified,
        userObjs.companySeen,
        userObjs.enabled,
        userObjs.username,
        userObjs.authorities,
        userObjs.accountNonExpired,
        userObjs.accountNonLocked,
        userObjs.credentialsNonExpired
      );
    } else {
      console.log("Invalid user data format");
      return null;
    }
  }
}
