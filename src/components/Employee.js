import React, {useEffect, useState} from 'react'
import user from '../assets/images/user.png'
import {NavLink, Route, Switch, BrowserRouter} from "react-router-dom";
import axios from "axios";
import {Contact} from "./contacts/Contact";


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
            url: 'http://109.248.133.36:8080/v1/api/user',
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
                    <a href="#" className="class_link">Related Processes</a>
                    <a href="#" className="class_link">To do</a>
                    <NavLink to='/contacts'> <a href="#" className="class_link">Contacts</a></NavLink>
                    <NavLink to='/paymentrequests'> <a href="#" className="class_link">Pay</a></NavLink>



                </div>
            </nav>
            <nav className="class_dropdown">
                <button className="employee_btn" onClick={toggleActive}>Link</button>
                <div className="class_dropdown-child">
                    <a href="#" className="class_link">CNPC</a>
                    <a href="#" className="class_link">RICHFIT BeiJing</a>
                    <a href="#" className="class_link">ITMMS</a>
                    <a href="#" className="class_link">HelpDesk</a>
                    <a href="#" className="class_link">OA PC Client Downloads</a>
                </div>
            </nav>
        </section>
    </div>)
}