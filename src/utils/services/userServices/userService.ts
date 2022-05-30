export const isAuth = () => {
    let keys = Object.keys(localStorage);
    let currentUserKey = keys.find(key =>
        key.includes("currentUser")
    )
    return !!currentUserKey;

}

const getCurrentUserKey = ()=>{
    let keys = Object.keys(localStorage);
    let currentUserKey = keys.find(key =>
        key.includes("currentUser")
    )
    return currentUserKey
}
export const getCurrentUser = () => {
    let currentUserKey = getCurrentUserKey();
    let currentUser;
    if (currentUserKey) {
        currentUser = localStorage.getItem(currentUserKey);
    }
    if (currentUser)
        return JSON.parse(currentUser);
    else
        return undefined;
}

export const logOut = ()=>{
    let currentUserKey = getCurrentUserKey();
    if (currentUserKey) {
        localStorage.removeItem(currentUserKey);
    }
}
