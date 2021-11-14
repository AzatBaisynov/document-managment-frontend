const initState = {
    isAuth: JSON.parse(localStorage.getItem("isAuth")) || false
}

const login = (state = initState, action) => {
    switch (action.type) {
        case "LOG_IN_SUCCESS":
            return {isAuth: true}
        case "LOG_OUT":
            return {isAuth: false}
        default:
            return state

    }
}
export default login
