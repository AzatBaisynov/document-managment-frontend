import React from 'react'
import cash from '../assets/images/cash.svg'
import {NavLink, Route} from "react-router-dom";
import PaymentRequests from "./documents/PaymentRequests";

export const Document = () => {
    return (

        <div className="report">
            <div className="report-box">
                <img src={cash}/>
                <h4 className="report-box-title">Cash Adva...</h4>
            </div>
        </div>
    )
}