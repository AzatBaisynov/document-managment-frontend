import React from 'react'
import Img from "../../assets/images/men.png"

export const Contact = ({employee, setEmployee}) => {

    const handleClick = () => {
        setEmployee(employee)
    }

    return (
        <div className="contacts__members-item" onClick={handleClick}>
            <div className="contacts__members-item-img">
                <img src={Img} alt="" />
            </div>
            <p className="contacts__members-link"> {employee?.fullName}</p>
        </div>
    )
}