import React, {useEffect, useState} from 'react'
import user from '../assets/images/user.png'
import {NavLink, Route, Switch, BrowserRouter} from "react-router-dom";
import axios from "axios";
import {Contact} from "./contacts/Contact";
import {DocumentsMenu} from "./DocumentsMenu";
import { address } from './data/data';
import { useSelector } from 'react-redux';


const toggleActive = (e) => {
    if (e.target.parentNode.className === 'class_dropdown') {
        e.target.parentNode.className = 'class_dropdown active'
    } else {
        e.target.parentNode.className = 'class_dropdown'
    }
}


export const DocumentManagementMenu = () => {

    const [members, setMembers] = useState({})
    useEffect(() => {
        console.log(user)
        const config = {
            method: 'GET',
            url: `${address.use}/v1/api/user`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                setMembers({...response.data})
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (<div>
        <section className="employee">
            <div className="employee_info">
                <p className="document__management__item">
                    My Work
                </p>
                <div className="employee_img document__management__item">
                    <img src={members.urlImage ? `${address.use}${members.urlImage}` : user} alt=""/>
                </div>

            </div>
            <nav className="class_dropdown active">
                <button className="employee_btn" onClick={toggleActive}>Component</button>
                <div className="class_dropdown-child">
                    {/*<NavLink to='/contacts' className="class_link">Contacts</NavLink>*/}
                </div>
            </nav>
        </section>
    </div>)
}