import { User } from "../data/user";

// Key is "authUser"
export function loadUserFromLocalStorage(key : any) {
    const userData = localStorage.getItem(key);
    if (userData === null || !userData) {
        console.log("No user data found");
        return null;
    }

    console.log(userData);

    const userObjs : any = JSON.parse(userData);
    return new User(
        userObjs.id,
        userObjs.name,
        userObjs.email,
        userObjs.phone,
        userObjs.city,
        userObjs.address,
        userObjs.role,
        userObjs.photo,
        userObjs.provider,
        userObjs.verified
    );
}