import React, {useEffect, useState} from 'react'
import {NavLink, useParams} from "react-router-dom";
import {MemoryRouter as Router} from "react-router";
import axios from "axios";
import {address} from '../data/data';
import {orders} from '../data/orders';
import V from '../../assets/images/v.svg'
import NewSlider from "./NewSlider";

export const Document = () => {
    const [document, setDocument] = useState([])
    const [fields, setFields] = useState([])
    const [positions, setPositions] = useState([])
    const [isShown, setIsShown] = useState(false)
    const {id} = useParams()
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        console.log(localStorage.getItem("token"))
        axios(config)
            .then(function (response) {
                setDocument(response.data)
                setFields(response.data.fields)
            })
            .catch(function (error) {
                console.log(error)
            });

    }, [])

    useEffect(() => {
        setPositions(orders)
    }, [])

    const handleChange = (e) => {
        let {id} = e.target
        const {value} = e.target
        id = id.replaceAll("inp", "").replace(/[^0-9]+/g, "")
        const fieldsWithValues = fields.map(el => {
            if (el.id === +id) {
                el.value = value
                return el
            } else {
                return el
            }
        })
        setFields(fieldsWithValues)
    }

    const handleSubmit = (e) => {
        let document = fields.map((el) => {
            let newDate = null
            let newAmount = null
            if (el.type === 3) {
                newDate = [...el.value.split("-").map(el => +el)]
            } else if (el.type === 10) {
                newAmount = [el.value]
            }
            const obj = {}
            if (el.id) obj.id = el.id
            if (el.value && !newDate && !newAmount) obj.value = el.value
            if (newDate) obj.date = newDate
            if (newAmount) obj.amount = newAmount
            if (!el.value && !newDate && !newAmount) obj.value = ""
            return obj
        })
        const data = {"documentId": id, fields: document}
        const config = {
            method: 'post',
            url: `${address.use}/v1/api/document/byuser`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            },
            data: data
        };
        axios(config)
            .then(({data}) => {
                (JSON.stringify(data))
                setSubmitted(true)
            })

            .catch(function (error) {
                    console.log(error);
                }
            )
    }

    const handleClose = () => {
        window.open("about:blank", "_self");
        window.close();
    }


    let counter = 0

    if (submitted) {
        return (
            <div>
                <div className="container">
                    <div className="contacts__created">
                        <img src={V} alt="done" width="150px"/>
                        <span>Your submission has been received!</span>
                        <button className="contacts__close" onClick={handleClose}>Close this page X</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="contacts__page">
                <div className="container">
                    <Router>
                        <div className="contacts__header">
                            <a href="/" className="contacts__header-logo contacts__header-item">
                                <i className="fas fa-home"/>
                            </a>
                            <a href="/" className="contacts__header-item"> Homepage</a>
                            <div className="contacts__header-item contacts__header-logo">
                                <i className="fas fa-angle-right"/>
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
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                       id={`inp${el.id}`}
                                                                       className={`document__input document__date`}/>
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 3 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="date" onChange={handleChange}
                                                                       id={`inp${el.id}`}
                                                                       className={`document__input document__date`}/>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 2 &&
                                                            <div
                                                                className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                                <div>
                                                                    {
                                                                        el?.choice?.split(", ").map((radio, idx) => (
                                                                            <span key={idx}>
                                                                                <input type="radio"
                                                                                       id={`${radio}-${el.id}`}
                                                                                       name={`radio${el.id}${el.name.replaceAll(" ", "")}`}
                                                                                       className="document__checkbox-item"
                                                                                       value={radio}
                                                                                       onClick={handleChange}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`${radio}-${el.id}`}
                                                                                    style={{marginLeft: "4px"}}>{radio}
                                                                                </label>
                                                                            </span>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 4 &&
                                                            <textarea
                                                                className={`document__input document__comment${el.required ? "document__require" : ""}`}
                                                                onChange={handleChange} id={`inp${el.id}`}
                                                            >
                                                            </textarea>
                                                        }
                                                        {
                                                            el.type === 6 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                       id={`inp${el.id}`}
                                                                       className={`document__input document__date`}
                                                                       placeholder="0.00"/>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 5 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require input__wrapper" : "input__wrapper"}`}>
                                                                <input type="file" onChange={handleChange}
                                                                       id={`inp${el.id}`}
                                                                       className={`document__input document__date input input__file`}
                                                                       placeholder="Please select the file to upload"
                                                                       accept=".jpg, .jpeg, .png"
                                                                       name="profile_pic"/>
                                                                <label htmlFor={`inp${el.id}`}
                                                                       className="input__file-button">
                                                                    <span className="input__file-icon-wrapper">
                                                                        Upload
                                                                    </span>
                                                                    <span
                                                                        className="input__file-button-text">Please select the file to upload</span>
                                                                </label>

                                                            </div>
                                                        }
                                                        {
                                                            el.type === 5 && !el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require input__wrapper" : "input__wrapper"}`}>
                                                                <input type="file" onChange={handleChange}
                                                                       id={`inp${el.id}`}
                                                                       className={`document__input document__date input input__file`}
                                                                       placeholder="Please select the file to upload"
                                                                       accept=".jpg, .jpeg, .png"
                                                                       name="profile_pic"/>
                                                                <label htmlFor={`inp${el.id}`}
                                                                       className="input__file-button"
                                                                       style={{margin: 0}}>
                                                                    <span className="input__file-icon-wrapper">
                                                                        Upload
                                                                    </span>
                                                                    <span
                                                                        className="input__file-button-text">Please select the file to upload</span>
                                                                </label>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {/* <DocumentUnique /> */}
                                    {/*<div className="border">*/}
                                    {/*    <div className="document__unique">*/}
                                    {/*        <p className="document__unique-item">*/}

                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            From*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            To*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Departure Date*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Departure Time*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Arrival Date*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Arrival Time*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Airline Company/Flight Number*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Ticket Category*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Ticket amount (KZT)*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Remarks*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}

                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*    {*/}
                                    {/*        isShown &&*/}
                                    {/*        <div className="document__unique-fill">*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-1  ">*/}
                                    {/*                <input type="checkbox" id="radio"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-2 ">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-3">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-4">*/}
                                    {/*                <input type="date"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-5">*/}
                                    {/*                <input type="time"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-6">*/}
                                    {/*                <input type="date"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-7">*/}
                                    {/*                <input type="time"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-8">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-9">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-10">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-11">*/}
                                    {/*                <input type="text"/>*/}
                                    {/*            </p>*/}
                                    {/*            <p className="document__unique-fill-item document__unique-fill-12"*/}
                                    {/*               onClick={()=>setIsShown(false)}*/}
                                    {/*            >*/}
                                    {/*                x*/}
                                    {/*            </p>*/}
                                    {/*        </div>*/}
                                    {/*    }*/}
                                    {/*    <div className="document__unique-more">*/}
                                    {/*        <input type="checkbox" id="radio"/>*/}
                                    {/*        <label htmlFor="radio" className="document__unique-label"> select all</label>*/}
                                    {/*        <i className="far fa-trash-alt document__unique-svg"> </i>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-1">*/}
                                    {/*            <i className="fas fa-arrow-up"> </i>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-2"*/}
                                    {/*                onClick={()=>setIsShown(true)}>*/}
                                    {/*            <i className="fas fa-plus"> </i>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-3">*/}
                                    {/*            <i className="fas fa-arrow-down"> </i>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="border">*/}
                                    {/*    <div className="document__unique">*/}
                                    {/*        <p className="document__unique-item">*/}

                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Start date*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            End Date*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Original Currency*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Accomodation Fee*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Other Fee*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Subtotal of the original currency*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Exchange Rate*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Amount (USD)*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Travel Days*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Region*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}
                                    {/*            Allowance*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-item">*/}

                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="document__unique-fill">*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-1  ">*/}
                                    {/*            <input type="checkbox" id="radio"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-2 ">*/}
                                    {/*            <input type="date"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-3">*/}
                                    {/*            <input type="date"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-4">*/}
                                    {/*            <select id="cars" className="document__select">*/}
                                    {/*                <option label="==Select==">==Select==</option>*/}
                                    {/*                <option label="Department afford/ Team afford">Department afford/ Team*/}
                                    {/*                    afford*/}
                                    {/*                </option>*/}
                                    {/*                <option label="Project afford/ Project">Project afford/ Project</option>*/}
                                    {/*            </select>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-5">*/}
                                    {/*            <input type="text"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-6">*/}
                                    {/*            <input type="text"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-7">*/}
                                    {/*            <input type="text" placeholder="0"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-8">*/}
                                    {/*            <input type="text"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-9">*/}
                                    {/*            <input type="text" placeholder="0"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-10">*/}
                                    {/*            <input type="text"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-11">*/}
                                    {/*            <select id="cars" className="document__select">*/}
                                    {/*                <option label="==Select==">==Select==</option>*/}
                                    {/*                <option label="Department afford/ Team afford">Department afford/ Team*/}
                                    {/*                    afford*/}
                                    {/*                </option>*/}
                                    {/*                <option label="Project afford/ Project">Project afford/ Project</option>*/}
                                    {/*            </select>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-12">*/}
                                    {/*            <input type="text" placeholder="0.00"/>*/}
                                    {/*        </p>*/}
                                    {/*        <p className="document__unique-fill-item document__unique-filled-13">*/}

                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="document__unique-more">*/}
                                    {/*        <input type="checkbox" id="radio"/>*/}
                                    {/*        <label htmlFor="radio" className="document__unique-label"> select all</label>*/}
                                    {/*        <i className="far fa-trash-alt document__unique-svg"> </i>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-1">*/}
                                    {/*            <i className="fas fa-arrow-up"> </i>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-2">*/}
                                    {/*            <i className="fas fa-plus"> </i>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="document__unique-btn document__unique-button-3">*/}
                                    {/*            <i className="fas fa-arrow-down"> </i>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}


                                </div>
                            </div>
                            <div className="document__orders">
                                <div className="document__orders-title">
                                    <p>
                                        Orders
                                    </p>

                                    <button className="document__orders-add"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setIsShown(!isShown)
                                            }}>
                                        <i className={`${isShown ? "fas fa-minus" : "fas fa-plus"}`}> </i>
                                    </button>
                                </div>
                                {
                                    isShown &&
                                    <div className="document__orders-items">
                                        <div className="document__orders-names">
                                            <div className="document__orders-name">
                                                Initiator
                                                <i className="fas fa-long-arrow-alt-down document__orders-arrow">

                                                </i>
                                            </div>
                                            <div className="document__orders-name">
                                                Initiator Team Head
                                                <i className="fas fa-long-arrow-alt-down document__orders-arrow">

                                                </i>
                                            </div>
                                            {
                                                positions.map((el) => (

                                                    <div className="document__orders-name">
                                                        {
                                                            el.post.position
                                                        }
                                                        {
                                                            el.post.id == "10" ? "" :
                                                                <i className="fas fa-long-arrow-alt-down document__orders-arrow">

                                                                </i>
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }


                            </div>
                            <div className="document__button-cover">
                                <div className="document__submit" onClick={handleSubmit}>
                                    Submit
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <NewSlider/>
            </div>
        )
    }
}