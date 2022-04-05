import React, {useEffect, useState} from 'react'
import direction from '../assets/images/direction.png'


export const DocumentManagementMenu = () => {

    return (<div>
        <section className="employee">
            <div className="employee_info">
                <p className="document__management__item">
                    Управление документами
                </p>
                <div className="employee_img document__management__item">
                    <img src={direction} alt=""/>
                </div>

            </div>
            <nav className="class_dropdown active">
                <button className="employee_btn">Элементы</button>
            </nav>
        </section>
    </div>)
}