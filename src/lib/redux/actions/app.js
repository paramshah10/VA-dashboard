export const addUID = (UID) => {
    return {
        type: "ADD_UID",
        UID
    }
}

export const addUserData = (userData) => {
    return {
        type: "ADD_USER_DATA",
        userData
    }
}