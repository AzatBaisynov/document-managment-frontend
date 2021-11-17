import React from 'react'
import user from '../assets/images/user.png'
import {NavLink, Route, Switch, BrowserRouter} from "react-router-dom";


const toggleActive = (e) => {
    if (e.target.parentNode.className === 'class_dropdown') {
        e.target.parentNode.className = 'class_dropdown active'
    } else {
        e.target.parentNode.className = 'class_dropdown'
    }
}


export const Employee = () => {
    return (<div>
        <section className="employee">
            <div className="employee_info">
                <div className="employee_img">
                    <img src={user} alt=""/>
                </div>
                <h4 className="employee_name">Ilzat Isseev</h4>
                <p className="employee_position">Software and IT services department</p>
            </div>
            <nav className="class_dropdown active">
                <button className="employee_btn" onClick={toggleActive}>My work</button>
                <div className="class_dropdown-child">
                    <a href="#" className="class_link">Related Processes</a>
                    <a href="#" className="class_link">To do</a>
                    <NavLink to='/contacts'> <a href="#" className="class_link">Contacts</a></NavLink>

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