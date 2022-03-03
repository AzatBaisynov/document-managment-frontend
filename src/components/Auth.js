import React, {useState} from 'react'
import logo from '../assets/images/logo.jpg'
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/actions/login";
import axios from "axios";
import { address } from './data/data';


export const Auth = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = JSON.stringify({login, password})
        var config = {
            method: 'post',
            url: `${address.use}/v1/api/auth`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: auth
        }
        axios(config).then(({data}) => {
            dispatch(loginAction(data))
        }).catch(() => {
            setMessage("Invalid data")
        })
    }

    return (
        <section className="auth">
            <div className="auth_container">
                <form className="auth_form" onSubmit={handleSubmit}>
                    <img src={logo} className="auth_logo" alt="logo"/>
                    <div className="auth_sign-in">
                        <label htmlFor="auth_loging">
                        </label>
                        <p className="auth_error-message">{message}</p>
                        <input id="auth_login" className="auth_username" placeholder="Логин" type="text"
                               onChange={(e) => setLogin(e.target.value)}/>
                        <label htmlFor="auth_password"> </label>
                        <input id="auth_password" className="auth_password" placeholder="Пароль" type="password"
                               onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="auth_login">Войти</button>
                    </div>
                </form>
            </div>
        </section>
    )
}