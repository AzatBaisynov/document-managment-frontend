import React from 'react'
import logo from '../assets/images/logo_header.png'
import userico from '../assets/images/user-ico.svg'
import lockico from '../assets/images/lock.svg'

export const Auth = () => {
    return (
        <section className="auth">
            <div className="auth_container">
                <form className="auth_form">
                    <img src={logo} className="auth_logo" />
                    <div className="auth_sign-in">
                        <label for="auth_loging">
                        </label>
                        <input id="auth_login" class="auth_username" placeholder="Username"/>
                        <label for="auth_password"></label>
                        <input id="auth_password" class="auth_password" placeholder="Password"/>
                        <button className="auth_login">Sign in</button>
                    </div>
                </form>
            </div>
        </section>
    )
}