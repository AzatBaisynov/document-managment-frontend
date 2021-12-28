import React, {useEffect, useState} from 'react'
import user from '../assets/images/user.png'
import {NavLink, Route, Switch, BrowserRouter} from "react-router-dom";
import axios from "axios";
import {Contact} from "./contacts/Contact";
import {DocumentsMenu} from "./DocumentsMenu";
import { address } from './data/data';


const toggleActive = (e) => {
    if (e.target.parentNode.className === 'class_dropdown') {
        e.target.parentNode.className = 'class_dropdown active'
    } else {
        e.target.parentNode.className = 'class_dropdown'
    }
}


export const Employee = () => {
    const [members, setMembers] = useState({})
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
                setMembers({...response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (<div>
        <section className="employee">
            <div className="employee_info">
                <div className="employee_img">
                    <img src={user} alt=""/>
                </div>
                <h4 className="employee_name">
                    {
                        members.fullName

                    }
                </h4>
                <p className="employee_position">  {
                    members.department
                }</p>
            </div>
            <nav className="class_dropdown active">
                <button className="employee_btn" onClick={toggleActive}>My work</button>
                <div className="class_dropdown-child">
                    <NavLink to='/contacts' className="class_link">Contacts</NavLink>
                    <a href="#" className="class_link">Related Processes</a>
                    <a href="#" className="class_link">To do</a>
                </div>
            </nav>
            <nav className="class_dropdown">
                <button className="employee_btn" onClick={toggleActive}>Link</button>
                <div className="class_dropdown-child">
                    <a href="http://www.ccecc.com.cn/" target="_blank" className="class_link">CCECC</a>
                    <a href="#" className="class_link">DMS user manual</a>
                </div>
            </nav>
        </section>
    </div>)
}