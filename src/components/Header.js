import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.jpg';
import wait from '../assets/images/wait.svg'
import see from '../assets/images/see.svg'
import exclamation from '../assets/images/exclamation.svg'
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/login";
import axios from "axios";
import { address } from './data/data';
import { store } from '../redux/store';
import { addUser } from '../redux/actions/user';

export const Header = () => {
    const [members, setMembers] = useState({})
    const [todo, setTodo] = useState(0)
    const [role, setRole] = useState("")
    useEffect(() => {

        const config = {
            method: 'GET',
            url: `${address.use}/v1/api/user`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                setMembers({ ...response.data })
                store.dispatch(addUser(response.data))
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

        const config2 = {
            method: 'get',
            url: `${address.use}/v1/api/document`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
    
        axios(config2)
            .then(function (response) {
                setTodo(response.data.length);
            })
            .catch(function (error) {
                console.log(error);
            });
            setInterval(() => {
                axios(config2)
                .then(function (response) {
                    setTodo(response.data.length);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }, 7000)
    }, [])

    useEffect(() => {
        const config = {
            method: 'GET',
            url: `${address.use}/v1/api/user/adm`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
        .then((res) => {
            setRole(res.data)
        })
    }, [])

    const dispatch = useDispatch()
    return (<header className="header">
        <div className="header_top">
            <div className="container header_container">
                <div className="header_logo">
                    <img src={logo} style={{width: "110px", height: "110px"}} />
                    {/*<span style={{fontSize: "40px", fontWeight: "700"}}>LOGO</span>*/}
                </div>
                <div className="header_info">
                    <div className="header_name">
                        <p> Пользователь </p>
                        <span className="bolder">{members.fullName}</span>
                        <img className="header_ico" src={wait} />
                        <span> {todo? todo : "0"} </span>
                        <img className="header_ico" src={see} />
                        <span> 0 </span>
                        <img className="header_ico" src={exclamation} />
                        <p>Поддержка</p>
                        <span className="bolder"
                            onClick={() => dispatch(logoutAction())}
                        >Выйти</span>
                    </div>

                </div>
            </div>
        </div>
        <div className="header_bottom">
            <div className="container header_container">
                <nav className="header_nav">
                    <div className="header_nav-item active">
                        <a href="/" className="header_link">Главная</a>
                    </div>
                    <div className="header_nav-item">
                        {
                            role === "ROLE_ADMIN" ? <a href="/management" className="header_link" target="_blank">Управление процессами</a> : ""
                        }
                    </div>
                </nav>
            </div>
        </div>
    </header>)
}