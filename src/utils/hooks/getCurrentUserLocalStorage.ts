const isAuth = () => {
    let keys = Object.keys(localStorage);
    let currentUserKey = keys.find(key =>
        key.includes("currentUser")
    )
    return !!currentUserKey;

}

export const getCurrentUserLocalStorage = () => {
    let keys = Object.keys(localStorage);
    let currentUserKey = keys.find(key =>
        key.includes("currentUser")
    )
    let currentUser;
    if (currentUserKey) {
        currentUser = localStorage.getItem(currentUserKey);
    }
    if (currentUser)
        return JSON.parse(currentUser);
    else
        return undefined;
}