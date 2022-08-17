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


export const Employee = () => {

    const [members, setMembers] = useState({})
    const [tasks, setTasks] = useState(0)

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

    useEffect(async () => {
        const config = {
            method: 'GET',
            url: `${address.use}/v1/api/task/notifications`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        const {data} = await axios(config)
        console.log(data)
        setTasks(data.length)
    }, [])

    return (<div>
        <section className="employee">
            <div className="employee_info">
                <div className="employee_img">
                    <img src={members.urlImage ? `${address.use}${members.urlImage}` : user} alt=""/>
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
                    <NavLink to='/related' className="class_link">Related Processes</NavLink>
                    <NavLink to='/tasks' className="class_link">To do</NavLink>
                    <NavLink to='/taskslist' className="class_link">Task {tasks !== 0 && (<span className='class_notification'>{tasks}</span>)}</NavLink>
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