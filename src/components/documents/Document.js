import React, {useEffect, useState } from 'react'
import {NavLink, useParams} from "react-router-dom";
import {MemoryRouter as Router} from "react-router";
import axios from "axios";

export const Document = () => {
    const [document, setDocument] = useState([])
    const {id} = useParams()

    useEffect(() => {
        console.log(id)
        const config = {
            method: 'get',
            url: `http://109.248.133.36:8080/v1/api/document/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        axios(config)
            .then(function (response) {
                setDocument(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])


    return (
        <div className="contacts__page">
            <div className="container">
                <Router>
                    <div className="contacts__header">
                        <a href="/" className="contacts__header-logo contacts__header-item">
                            <i className="fas fa-home"> </i>
                        </a>
                        <a href="/" className="contacts__header-item"> Homepage</a>
                        <div className="contacts__header-item contacts__header-logo">
                            <i className="fas fa-angle-right">

                            </i>
                        </div>
                        <NavLink to='/address' className="contacts__header-item"> Address Book</NavLink>
                    </div>
                </Router>
                <div className="document">
                    <p className="document__approval">
                        Approval Content
                    </p>
                    <div className="document__cover">

                        {
                            <div className="document__title">
                                {document?.document?.name}
                            </div>
                        }
                        <div className="document__rows">
                            {
                                document?.fields?.map((el) => (
                                    <div className={`${el.half ? "document__row-half" : "document__row-full"}`}>
                                        <div className="document__flex">
                                            <div
                                                className={`${el.half ? "document__subtitle-sm" : "document__subtitle-lg"}`}>
                                                {el.name}
                                            </div>
                                            <div className="document__desc">
                                                {
                                                    el.type == "1" &&
                                                    <input type="text"
                                                           className={`document__input ${el.required ? "document__require" : ""}`}/>
                                                }

                                                {
                                                    el.type == "2" &&
                                                    <input type="date"
                                                           className={`document__input document__date${el.required ? "document__require" : ""}`}/>
                                                }


                                                {
                                                    el.type == "3" &&
                                                    <div
                                                        className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                        <div className="document__yes">
                                                            <input type="radio" id="yes"
                                                                   name="contact" value="email"/>
                                                            <label htmlFor="yes">Yes</label>
                                                        </div>
                                                        <input type="radio" id="no"
                                                               name="contact" value="phone"/>
                                                        <label htmlFor="no">No</label>
                                                    </div>
                                                }

                                                {
                                                    el.type == "4" &&

                                                    <input type="text"
                                                           className={`document__input document__comment${el.required ? "document__require" : ""}`}/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}