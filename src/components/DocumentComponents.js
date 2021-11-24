import React from 'react'
import cash from '../assets/images/cash.svg'
import { Link, Route } from "react-router-dom";
import PaymentRequests from "./documents/PaymentRequests";

export const DocumentComponents = ({category_id}) => {
    
    return (
        <a href="/document" target="_blank" className="d-inline">
            <div className="report">
                <div className="report-box">
                    <img src={cash} />
                    <h4 className="report-box-title">Cash Adva...</h4>
                </div>
            </div>
        </a>
    )
}