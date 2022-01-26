import React from 'react'
import news from '../assets/images/news.png'



export const NewsManagementMenu = () => {
    return (
        <div>
        <section className="employee">
            <div className="employee_info">
                <p className="document__management__item">
                    My Work
                </p>
                <div className="employee_img document__management-img">
                    <img src={news} alt=""/>
                </div>

            </div>
            <nav className="class_dropdown active">
                <button className="employee_btn"> Category navigation </button>
                <div className="class_dropdown-child">
                    <a  href="#" className="notice__menu"> Notice </a>
                </div>
            </nav>
        </section>
    </div>)
}