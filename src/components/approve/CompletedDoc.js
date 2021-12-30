import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { address, data } from '../data/data'
import { NavLink } from 'react-router-dom'
import { MemoryRouter as Router } from "react-router";
import V from '../../assets/images/v.svg'
import X from '../../assets/images/x.jpg'

export const CompleteDoc = () => {
    const { id } = useParams()
    const [document, setDocument] = useState([])
    const [submitted, setSubmitted] = useState(1)
    const [fields, setFields] = useState([])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/completed/${id}`,
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
                console.log(error)
            });

    }, [])

    const handleApprove = () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/progress/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setSubmitted(0)
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("approved")
    }

    const handleDecline = () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/decline/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setSubmitted(2)
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log("approved")
    }

    const handleClose = () => {
        window.open("about:blank", "_self");
        window.close();
    }

    let counter = 0

    if (submitted === 0) {
        return (
            <div>
                <div className="container">
                    <div className="contacts__created">
                        <img src={V} alt="done" width="150px" />
                        <span>Document has been approved!</span>
                        <button className="contacts__close" onClick={handleClose}>Close this page X</button>
                    </div>
                </div>
            </div>
        )
    }
    else if (submitted === 2) {
        return (
            <div>
                <div className="container">
                    <div className="contacts__created">
                        <img src={X} alt="done" width="150px" />
                        <span>Document has been rejected!</span>
                        <button className="contacts__close" onClick={handleClose}>Close this page X</button>
                    </div>
                </div>
            </div>
        )
    }
     else {
        return (
            <div className="contacts__page">
                <div className="container">
                    <Router>
                        <div className="contacts__header">
                            <a href="/" className="contacts__header-logo contacts__header-item">
                                <i className="fas fa-home" />
                            </a>
                            <a href="/" className="contacts__header-item"> Homepage</a>
                            <div className="contacts__header-item contacts__header-logo">
                                <i className="fas fa-angle-right" />
                            </div>
                            <NavLink to='/address' className="contacts__header-item">
                                {document?.document?.name}
                            </NavLink>
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
                                        {
                                            document?.document?.name
                                        }
                                    </div>
                                }
                                <div className="document__rows">
                                    {
                                        document?.fields?.map((el, idx, arr) => (
                                            <div className={`${el.half ? "document__row-half" : "document__row-full"}`}
                                                key={idx}>
                                                <div className="document__hidden">
                                                    {
                                                        counter += el.count
                                                    }
                                                </div>
                                                {
                                                    counter % 2 > 0 && arr[idx + 1] && arr[idx + 1] !== 0 && !arr[idx + 1].half
                                                    &&
                                                    <div className="document__row-empty">
                                                        <div className="document__hidden">
                                                            {
                                                                counter = counter + 1
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    counter % 2 > 0 && el.last
                                                    &&
                                                    <div className="document__row-empty">
                                                        <div className="document__hidden">
                                                            {
                                                                counter = counter + 1
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                <div className="document__flex">
                                                    <div
                                                        className={`${el.half ? "document__subtitle-sm" : "document__subtitle-lg"}`}>
                                                        {el.name}
                                                    </div>
                                                    <div className="document__desc">
                                                        {
                                                            el.type === 1 && el.half &&
                                                            <div className={`${el.required ? "document__require" : ""}`}>
                                                                {/* <input type="text" onChange={handleChange}
                                                                id={`inp${el.id}`}
                                                                className={`document__input document__date`} /> */}
                                                                <p className="document__info_light">{el.value}</p>
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 3 &&
                                                            <div className={`${el.required ? "document__require" : ""}`}>
                                                                {/* <input type="date" onChange={handleChange}
                                                                id={`inp${el.id}`}
                                                                className={`document__input document__date`} /> */}
                                                                <p className="document__info_light">{el.date}</p>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 2 &&
                                                            <div
                                                                className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                                <div>
                                                                    {
                                                                        // el?.choice?.split(", ").map((radio, idx) => (
                                                                        //     <span key={idx}>
                                                                        //         <input type="radio"
                                                                        //             id={`${radio}-${el.id}`}
                                                                        //             name={`radio${el.id}${el.name.replaceAll(" ", "")}`}
                                                                        //             className="document__checkbox-item"
                                                                        //             value={radio}
                                                                        //             onClick={handleChange}
                                                                        //         />
                                                                        //         <label
                                                                        //             htmlFor={`${radio}-${el.id}`}>{radio}
                                                                        //         </label>
                                                                        //     </span>
                                                                        // ))
                                                                        <p className="document__info_light">{el.value}</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 4 &&
                                                            <textarea
                                                                className={`document__input document__comment${el.required ? "document__require" : ""}`}
                                                                value={el.value} id={`inp${el.id}`} style={{ color: "#a7a7a7" }} readOnly
                                                            >
                                                            </textarea>
                                                        }
                                                        {
                                                            el.type === 6 && el.half &&
                                                            <div className={`${el.required ? "document__require" : ""}`}>
                                                                {/* <input type="text" onChange={handleChange}
                                                                id={`inp${el.id}`}
                                                                className={`document__input document__date`}
                                                                placeholder="0.00" /> */}
                                                                <p className="document__info_light">{el.date}</p>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 5 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require input__wrapper" : "input__wrapper"}`}>
                                                                {/* <input type="file" onChange={handleChange}
                                                                id={`inp${el.id}`}
                                                                className={`document__input document__date input input__file`}
                                                                placeholder="Please select the file to upload"
                                                                accept=".jpg, .jpeg, .png"
                                                                name="profile_pic" />
                                                            <label htmlFor={`inp${el.id}`}
                                                                className="input__file-button">
                                                                <span className="input__file-icon-wrapper">
                                                                    Upload
                                                                </span>
                                                                <span
                                                                    className="input__file-button-text">Please select the file to upload</span>
                                                            </label> */}
                                                                Here will be attachments
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 5 && !el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require input__wrapper" : "input__wrapper"}`}>
                                                                {/* <input type="file" onChange={handleChange}
                                                                id={`inp${el.id}`}
                                                                className={`document__input document__date input input__file`}
                                                                placeholder="Please select the file to upload"
                                                                accept=".jpg, .jpeg, .png"
                                                                name="profile_pic" />
                                                            <label htmlFor={`inp${el.id}`}
                                                                className="input__file-button" style={{ margin: 0 }}>
                                                                <span className="input__file-icon-wrapper">
                                                                    Upload
                                                                </span>
                                                                <span
                                                                    className="input__file-button-text">Please select the file to upload</span>
                                                            </label> */}
                                                                Here will be attachments
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}