import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {MemoryRouter as Router} from "react-router";
import axios from "axios";

export const Document = () => {
    const [document, setDocument] = useState([])
    const [fields, setFields] = useState([])

    const {id} = useParams()


    useEffect(() => {
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
                setFields(response.data.fields)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }
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
                        <NavLink to='/address' className="contacts__header-item"> Address
                            Book</NavLink>
                    </div>
                </Router>
                <div className="document">
                    <p className="document__approval">
                        Approval Content
                    </p>
                    <form>
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
                                                        <div className={`${el.required ? "document__require" : ""}`}>
                                                            <input type="text" onChange={handleChange} id={`inp${el.id}`}
                                                                   className={`document__input ${el.required ? "document__require" : ""}`}/>
                                                        </div>
                                                    }

                                                    {
                                                        el.type == "3" &&
                                                        <div className={`${el.required ? "document__require" : ""}`}>
                                                            <input type="date" onChange={handleChange} id={`inp${el.id}`}
                                                                   className={`document__input document__date`}/>
                                                        </div>
                                                    }

                                                    {
                                                        el.type == "2" &&
                                                        <div
                                                            className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                            <div>
                                                                {
                                                                    el?.choice?.split(", ").map((radio) => (
                                                                        <span>
                                                                        <input type="radio"
                                                                               id={`${radio}-${el.id}`}
                                                                               name="radio"
                                                                               className="document__checkbox-item"
                                                                               value={radio}
                                                                               onClick={handleChange}
                                                                        />
                                                                        <label
                                                                            htmlFor={`${radio}-${el.id}`}>{radio}
                                                                        </label>
                                                                     </span>
                                                                    ))

                                                                }
                                                            </div>
                                                        </div>
                                                    }

                                                    {
                                                        el.type == "4" &&

                                                        <textarea
                                                            className={`document__input document__comment${el.required ? "document__require" : ""}`}
                                                            onChange={handleChange}id={`inp${el.id}`}
                                                        >
                                                        </textarea>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="document__button-cover">
                            <button className="document__submit" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}