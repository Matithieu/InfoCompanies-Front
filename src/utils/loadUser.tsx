import { User } from "../data/user";

// Key is "authUser"
export function loadUserFromLocalStorage(key: any) {
    const userData = localStorage.getItem(key);
    if (userData === null || !userData || userData === "") {
        console.log("No user data found");
        return null;
    }

    console.log("User data found: " + userData);

    const userObjs: any = JSON.parse(userData);
    if (userObjs != undefined) {
        return new User(
            userObjs.id,
            userObjs.name,
            userObjs.email,
            userObjs.phone,
            userObjs.city,
            userObjs.address,
            userObjs.role,
            userObjs.provider,
            userObjs.verified
        );
    } else {
        console.log("Invalid user data format");
        return null;
    }
}
