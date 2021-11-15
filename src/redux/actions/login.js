export const loginAction = (token) =>{
    localStorage.setItem("token", token)
    localStorage.setItem("isAuth","true")
    return {type: "LOG_IN_SUCCESS"}
}
export const logoutAction = () =>{
    localStorage.removeItem("isAuth")
    return {type: "LOG_OUT"}
}