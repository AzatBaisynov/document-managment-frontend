import React from 'react'
import user from '../assets/images/user.png'

const toggleActive = (e) => {
    if (e.target.parentNode.className === 'employee_dropdown') {
        e.target.parentNode.className = 'employee_dropdown active'
    } else {
        e.target.parentNode.className = 'employee_dropdown'
    }
}

export const Employee = () => {
    return (<div>
        <section className="employee">
            <div className="employee_info">
                <div className="employee_img">
                    <img src={user} alt="" />
                </div>
                <h4 className="employee_name">Ilzat Isseev</h4>
                <p className="employee_position">Software and IT services department</p>
            </div>
            <nav className="employee_dropdown active">
                <button className="employee_btn" onClick={toggleActive}>My work</button>
                <div className="employee_dropdown-child">
                    <a href="#" className="employee_link">Related Processes</a>
                    <a href="#" className="employee_link">To do</a>
                    <a href="#" className="employee_link">Contacts</a>
                </div>
            </nav>
            <nav className="employee_dropdown">
                <button className="employee_btn" onClick={toggleActive}>Link</button>
                <div className="employee_dropdown-child">
                    <a href="#" className="employee_link">CNPC</a>
                    <a href="#" className="employee_link">RICHFIT BeiJing</a>
                    <a href="#" className="employee_link">ITMMS</a>
                    <a href="#" className="employee_link">HelpDesk</a>
                    <a href="#" className="employee_link">OA PC Client Downloads</a>
                </div>
            </nav>
        </section>
    </div>)
}