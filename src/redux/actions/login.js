export const loginAction = () =>{
    return {type: "LOG_IN_SUCCESS"}
}
export const logoutAction = () =>{
    localStorage.removeItem("isAuth")
    return {type: "LOG_OUT"}
}