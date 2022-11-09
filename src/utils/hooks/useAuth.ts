const isAuth = ()=>{
    let keys = Object.keys(localStorage);
    let currentUserKey = keys.find(key=>
        key.includes("currentUser")
    )
    return !!currentUserKey;
}

export const useAuth = () => {
    return isAuth();
}
