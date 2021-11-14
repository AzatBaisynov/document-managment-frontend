import React from 'react';
import logo from '../assets/images/logo_header.png';
import wait from '../assets/images/wait.svg'
import see from '../assets/images/see.svg'
import exclamation from '../assets/images/exclamation.svg'
import {useDispatch} from "react-redux";
import {logoutAction} from "../redux/actions/login";

export const Header = () => {
    const dispatch = useDispatch()
    return (<header className="header">
        <div className="header_top">
            <div className="container header_container">
                <div className="header_logo">
                    <img src={logo}></img>
                </div>
                <div className="header_info">
                    <p className="header_name">Welcome <span className="bolder">Ilzat</span><
                        img className="header_ico" src={wait}/>0 <img className="header_ico" src={see}/>0
                        <img className="header_ico" src={exclamation}/>Feedback
                        <span className="bolder"
                        onClick={() => dispatch(logoutAction())}
                        >Logout</span>
                    </p>

                </div>
            </div>
        </div>
        <div className="header_bottom">
            <div className="container header_container">
                <nav className="header_nav">
                    <div className="header_nav-item">
                        <a href="#" className="header_link">Home</a>
                    </div>
                </nav>
            </div>
        </div>
    </header>)
}