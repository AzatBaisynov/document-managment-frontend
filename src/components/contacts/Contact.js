import React, { useEffect } from 'react'
import Img from "../../assets/images/men.png"
import { address } from '../data/data'

export const Contact = ({employee, setEmployee}) => {

    const handleClick = () => {
        setEmployee(employee)
    }

    return (
        <div className="contacts__members-item" onClick={handleClick}>
            <div className="contacts__members-item-img">
                <img src={employee.urlImg ? `${address.use}${employee.urlImg}` : Img} alt="" />
            </div>
            <p className="contacts__members-link"> {employee?.fullName}</p>
        </div>
    )
}