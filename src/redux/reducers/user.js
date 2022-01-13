
const initialState = {
    user : {}
}

const userReducer = (state = initialState, acition) => {
    switch (acition.type) {
        case "ADD_USER" : return {user : acition.value}
        default: return state
    }
}

export default userReducer