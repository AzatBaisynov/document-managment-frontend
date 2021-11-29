import React, { useEffect, useState } from 'react'
import cash from '../assets/images/cash.svg'
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import PaymentRequests from "./documents/PaymentRequests";

export const DocumentComponents = ({ category_id }) => {

    const [document, setDocument] = useState([])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://109.248.133.36:8080/v1/api/document/categories/${category_id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        axios(config)
            .then(function (response) {
                setDocument(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <div>
            {
                document.map((el, idx) => (
                    <a href="/document" target="_blank" className="d-inline" key={idx}>
                        <div className="report">
                            <div className="report-box">
                                <img src={cash} />
                            </div>
                            <h4 className="report-box-title" style={{ color: "black" }}>{el.name}</h4>
                        </div>
                    </a>
                ))
            }
        </div>

    )
}