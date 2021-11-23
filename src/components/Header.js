import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo_header.png';
import wait from '../assets/images/wait.svg'
import see from '../assets/images/see.svg'
import exclamation from '../assets/images/exclamation.svg'
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/login";
import axios from "axios";

export const Header = () => {
    const [members, setMembers] = useState({})
    useEffect(() => {
        const config = {
            method: 'GET',
            url: 'http://109.248.133.36:8080/v1/api/user',
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                setMembers({ ...response.data })
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    const dispatch = useDispatch()
    return (<header className="header">
        <div className="header_top">
            <div className="container header_container">
                <div className="header_logo">
                    <img src={logo} />
                </div>
                <div className="header_info">
                    <div className="header_name">
                        <p> Welcome </p>
                        <span className="bolder">{members.fullName}</span><
                            img className="header_ico" src={wait} />0 <img className="header_ico" src={see} />0
                        <img className="header_ico" src={exclamation} />
                        <p>Feedback</p>
                        <span className="bolder"
                            onClick={() => dispatch(logoutAction())}
                        >Logout</span>
                    </div>

                </div>
            </div>
        </div>
        <div className="header_bottom">
            <div className="container header_container">
                <nav className="header_nav">
                    <div className="header_nav-item">
                        <a href="/" className="header_link">Home</a>
                    </div>
                </nav>
            </div>
        </div>
    </header>)
}