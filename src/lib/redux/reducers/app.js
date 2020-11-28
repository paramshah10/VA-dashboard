const initialState = {
    UID: "",
    userData: {}
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_UID":
            localStorage.setItem('uid', action.UID)
            return Object.assign({}, state, {
                UID: action.UID
            })

        case "ADD_USER_DATA":
            return Object.assign({}, state, {
                userData: action.userData
            })

        default:
            return state
    }
}

export default appReducer