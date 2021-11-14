import React, {useState} from 'react'
import logo from '../assets/images/logo_header.png'
import userico from '../assets/images/user-ico.svg'
import lockico from '../assets/images/lock.svg'
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/actions/login";
import axios from "axios";


export const Auth = ({history}) => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = JSON.stringify({login,password})
        if (login === "admin" && password === "admin") {
            dispatch(loginAction())
            // history.push("/")
            localStorage.setItem("isAuth","true")
        } else {
            setMessage("invalid data")
        }

    }
    return (
        <section className="auth">
            <div className="auth_container">
                <form className="auth_form" onSubmit={handleSubmit}>
                    <img src={logo} className="auth_logo"/>
                    <div className="auth_sign-in">
                        <label for="auth_loging">
                        </label>
                        <p className="auth_error-message">{message}</p>
                        <input id="auth_login" class="auth_username" placeholder="Username"
                               onChange={(e) => setLogin(e.target.value)}
                        />
                        <label for="auth_password"></label>
                        <input id="auth_password" class="auth_password" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="auth_login">Sign in</button>
                    </div>
                </form>
            </div>
        </section>
    )
}