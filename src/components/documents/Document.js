import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import { MemoryRouter as Router } from "react-router";
import axios from "axios";
import { address } from '../data/data';
import V from '../../assets/images/v.svg'
import DocumentCompleted from './DocumentCompleted';
import file from '../../assets/images/file.svg'
import { useSelector } from 'react-redux'
import { DocumentDatePicker } from './DocumentDatePicker';
import { DocumentDateTimePicker } from './DocumentDateTimePicker';
import {DocumentUnique} from "./DocumentUnique";

export const Document = () => {
    const [document, setDocument] = useState([])
    const [fields, setFields] = useState([])
    const [positions, setPositions] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [isShowProcess, setIsShownProcess] = useState(false)
    const { id } = useParams()
    const [submitted, setSubmitted] = useState(false)
    const [attachments, setAttachments] = useState([])
    const user = useSelector((store) => store?.userReducer?.user)
    const [dateFromTo, setDateFromTo] = useState("0 hours")
    const [totalDays, setTotalDays] = useState("0 days")
    const [projectNeed, setProjectNeed] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/${id}`,
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
            // console.log(user)
    }, [])

    useEffect(async () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/project`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        const { data } = await axios(config)
        setProjects(data)
    }, [])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/orders/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        axios(config)
            .then(function (response) {
                setPositions(response.data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, [])

    const handleChange = (e) => {
        let { id } = e.target
        const { value } = e.target
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
        const fromToElement = fields.find((el, idx) => {
            if (el.type === 33) {
                return el
            }
        })
        const fromToElement2 = fields.find((el, idx) => {
            if (el.type === 37) {
                return el
            }
        })
        if (fromToElement) {
            fromToHoursCounter(fromToElement.fromTo, fromToElement.id)
            
        }
        if (fromToElement2) {
            totalDaysCounter(fromToElement2.fromTo, fromToElement2.id)
        }
    }

    const handleChangeDate = (e, id) => {
        const value = e
        id = id.replaceAll("inp", "")

        const fieldsWithValues = fields.map(el => {
            if (el.id === +id) {
                el.value = value
                return el
            } else {
                return el
            }
        })
        setFields(fieldsWithValues)
        const fromToElement = fields.find((el, idx) => {
            if (el.type === 33) {
                return el
            }
        })
        const fromToElement2 = fields.find((el, idx) => {
            if (el.type === 37) {
                return el
            }
        })
        if (fromToElement) {
            fromToHoursCounter(fromToElement.fromTo, fromToElement.id)

        }
        if (fromToElement2) {
            totalDaysCounter(fromToElement2.fromTo, fromToElement2.id)
        }
    }

    const handleChangeProject = (e) => {
        setProjectNeed(false)
        let { id } = e.target
        const { value } = e.target
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
        const fromToElement = fields.find((el, idx) => {
            if (el.type === 33) {
                return el
            }
        })
        const fromToElement2 = fields.find((el, idx) => {
            if (el.type === 37) {
                return el
            }
        })
        if (fromToElement) {
            fromToHoursCounter(fromToElement.fromTo, fromToElement.id)

        }
        if (fromToElement2) {
            totalDaysCounter(fromToElement2.fromTo, fromToElement2.id)
        }
    }

    const handleSubmit = (e) => {
        let docFields = fields.map((el) => {
            let newDate = null
            let newAmount = null
            if (el.type === 3) {
                newDate = [...el.value.split("-").map(el => +el)]
            } else if (el.type === 10) {
                newAmount = [el.value]
            } else if (el.type === 20) {
                el.value = user.fullName
            } else if (el.type === 21) {
                el.value = user.department
            } else if (el.type === 22 && !el.value) {
                el.value = el.choice.split(", ")[0]
            }
            const obj = {}
            if (el.id) obj.id = el.id
            if (el.value && !newDate && !newAmount) obj.value = el.value
            if (newDate) obj.date = newDate
            if (newAmount) obj.amount = newAmount
            if (!el.value && !newDate && !newAmount) obj.value = ""
            return obj
        })
        let data
        if (document.document.subOrder) {
            data = { "documentId": id, fields: docFields, "status" : document.document.subOrder}
        } else {
            data = { "documentId": id, fields: docFields }
        }
        const config = {
            method: 'post',
            url: `${address.use}/v1/api/document/byuser${document.document.subOrder ? "/multi-approval" : ""}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            },
            data: data
        };
        axios(config)
            .then(async ({ data }) => {
                setSubmitted(true)
                if (attachments.length) {
                    for (let i = 0; i < attachments.length; i++) {
                        const formData = new FormData()
                        formData.append(
                            'file',
                            attachments[i],
                            attachments[i].name
                        )
                        await axios.post(`${address.use}/v1/api/file/attachment/${data.id}`, formData, {
                            headers: {
                                'Authorization': localStorage.getItem("token"),
                            }
                        })
                    }
                }
            })

            .catch(function (error) {
                console.log(error);
            }
            )
    }

    const handleAttachment = async (e) => {
        if (e.target.value) {
            setAttachments(Array.from(e.target.files))
        }
    }

    const handleClose = () => {
        window.open("about:blank", "_self");
        window.close();
    }

    const handleSetup = (e) => {
        let { id } = e.target
        const { value } = e.target
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

        const status = e.target.className.split(" ")[1]
        // console.log(status)
        // console.log(document)

        const newDoc = document
        newDoc.document.subOrder = +status

        setDocument(newDoc)
    }


    let counter = 0

    const fromToHoursCounter = (fromTo, id) => {
        const fromIdx = +(fromTo.split(", ")[0])
        const toIdx = +(fromTo.split(", ")[1])
        const from = fields.find((el, idx) => idx === fromIdx - 1)
        const to = fields.find((el, idx) => idx === toIdx - 1)
        if (from && to && from.value && to.value) {
            let dateFrom = new Date(from.value)
            let dateTo = new Date(to.value)
            const difference = Math.abs(dateTo - dateFrom)
            const newFields = fields.map(el => {
                if (el.id === id) {
                    el.value = `${Math.ceil((difference / (1000 * 60 * 60)) % 24)} hours`
                    return el
                } 
                return el
            })
            setFields(newFields)
            setDateFromTo(`${Math.ceil((difference / (1000 * 60 * 60)) % 24)} hours`)
            return `${Math.ceil((difference / (1000 * 60 * 60)) % 24)} hours`
        } else {
            const newFields = fields.map(el => {
                if (el.id === id) {
                    el.value = "0 hours"
                    return el
                } 
                return el
            })
            setFields(newFields)
            setDateFromTo("0 hours")
            return "0 hours"
        }
    }

    const totalDaysCounter = (fromTo, id) => {
        const fromIdx = +(fromTo.split(", ")[0])
        const toIdx = +(fromTo.split(", ")[1])
        const from = fields.find((el, idx) => idx === fromIdx - 1)
        const to = fields.find((el, idx) => idx === toIdx - 1)
        if (from && to && from.value && to.value) {
            let dateFrom = new Date(from.value)
            let dateTo = new Date(to.value)
            const difference = Math.abs(dateTo - dateFrom)
            const newFields = fields.map(el => {
                if (el.id === id) {
                    el.value = `${Math.floor(difference / (24*60*60*1000))} days`
                    return el
                } 
                return el
            })
            setFields(newFields)
            setTotalDays(`${Math.floor(difference / (24*60*60*1000))} days`)
            return `${Math.floor(difference / (24*60*60*1000))} days`
        } else {
            const newFields = fields.map(el => {
                if (el.id === id) {
                    el.value = "0 days"
                    return el
                }
                return el
            })
            setFields(newFields)
            setTotalDays("0 days")
            return "0 days"
        }
    }

    if (submitted) {
        return (
            <div>
                <div className="container">
                    <div className="contacts__created">
                        <img src={V} alt="done" width="150px" />
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
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`} />
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 20 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`} 
                                                                    value={user.fullName}
                                                                    />
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 21 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`} 
                                                                    value={user.department}
                                                                    />
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 33 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`} 
                                                                    value={`${dateFromTo}`}
                                                                    />
                                                            </div>
                                                        }

                                                        {/* {
                                                            el.type === 3 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="date" onChange={handleChange}
                                                                    lang="en"
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`} />
                                                            </div>
                                                        } */}
                                                        {
                                                            el.type === 3 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <DocumentDatePicker handleChange={handleChangeDate} dateId={`inp${el.id}`} />
                                                            </div>
                                                        }

                                                        {
                                                            el.type === 34 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <DocumentDateTimePicker handleChange={handleChangeDate} dateId={`inp${el.id}`} />
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 36 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <DocumentDatePicker handleChange={handleChangeDate} dateId={`inp${el.id}`} />
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 37 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`datefromto${el.id}`}
                                                                    className={`document__input document__date`} 
                                                                    value={totalDays}
                                                                    />
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
                                                                                    style={{ marginLeft: "4px" }}>{radio}
                                                                                </label>
                                                                            </span>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 52 &&
                                                            <div
                                                                className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                                <div>
                                                                    {
                                                                        el?.choice?.split(", ").map((radio, idx, arr) => 
                                                                        (
                                                                            <span key={idx}>
                                                                                <input type="radio"
                                                                                    id={`${radio}-${el.id}`}
                                                                                    name={`radio${el.id}${el.name.replaceAll(" ", "")}`}
                                                                                    className="document__checkbox-item"
                                                                                    value={radio}
                                                                                    onClick={idx === arr.length - 1 ? () => {
                                                                                        setProjectNeed(true)
                                                                                    } : handleChangeProject}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`${radio}-${el.id}`}
                                                                                    style={{ marginLeft: "4px" }}>{radio}
                                                                                </label>
                                                                                {
                                                                                    idx === arr.length -1 && projectNeed ? 
                                                                                        (<select style={{ margin: "0 10px" }} id={`inp${el.id}`} onChange={handleChange}>
                                                                                        {
                                                                                            projects.map((el2, idx) => (
                                                                                                <option key={idx} value={`Project ${el2.title}`}> {el2.title} </option>
                                                                                            ))
                                                                                        }
                                                                                    </select>) : false
                                                                                }
                                                                            </span>
                                                                        )
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 32 &&
                                                            <div
                                                                className={`document__checkbox ${el.required ? "document__require" : ""}`}>
                                                                <div>
                                                                    {
                                                                        el?.choice?.split(", ").map((radio, idx) => (
                                                                            <span key={idx}>
                                                                                <input type="radio"
                                                                                    id={`${radio}-${el.id}`}
                                                                                    name={`radio${el.id}${el.name.replaceAll(" ", "")}`}
                                                                                    className={`document__checkbox-item ${idx+1}`}
                                                                                    value={radio}
                                                                                    onClick={handleSetup}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`${radio}-${el.id}`}
                                                                                    style={{ marginLeft: "4px" }}>{radio}
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
                                                            el.type === 22 &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                    <select id={`inp${el.id}`} onChange={handleChange}>
                                                                {
                                                                    el.choice.split(", ").map((el2, idx) => (
                                                                        <option key={idx} value={el2}>{el2}</option>
                                                                    ))
                                                                }
                                                                </select>
                                                            </div>
                                                        }
                                                        {
                                                            el.type === 6 && el.half &&
                                                            <div
                                                                className={`${el.required ? "document__require" : ""}`}>
                                                                <input type="text" onChange={handleChange}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date`}
                                                                    placeholder="0.00" />
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
                                                                    name="profile_pic" />
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
                                                                <input type="file" onChange={handleAttachment}
                                                                    id={`inp${el.id}`}
                                                                    className={`document__input document__date input input__file`}
                                                                    placeholder="Please select the file to upload"
                                                                    name="profile_pic"
                                                                    multiple />
                                                                <label htmlFor={`inp${el.id}`}
                                                                    className="input__file-button"
                                                                    style={{ margin: 0, display: "flex", alignItems: "center"}}>
                                                                    <span className="input__file-icon-wrapper">
                                                                        Upload
                                                                    </span>
                                                                    {
                                                                        attachments.length ? attachments.map((el, idx) => <span key={idx} className="input__file-button-text" style={{marginRight : "20px", display: "flex", alignItems: "center"}}><img src={file} style={{width: "40px", marginRight: "5px"}} alt="file" /> {el.name}</span>) : <span className="input__file-button-text">Please select the file to upload</span>
                                                                    }
                                                                </label>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="document__orders">
                                <div style={{ padding: "10px", background: "whitesmoke" }}>
                                    <div className="document__orders-title">
                                        <p style={{ fontSize: "12px" }}>
                                            Graph
                                        </p>

                                        <button className="document__orders-add"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setIsShown(!isShown)
                                            }}>
                                            <i className={`${isShown ? "fas fa-minus" : "fas fa-plus"}`}> </i>
                                        </button>
                                    </div>
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
                                                positions.map((el, idx) => (

                                                    <div className="document__orders-name" key={idx}>
                                                        {
                                                            el.post.position
                                                        }
                                                        {
                                                            idx < positions.length -1 ? <i className="fas fa-long-arrow-alt-down document__orders-arrow"></i> : ""
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="document__orders">
                                <div style={{ padding: "10px", background: "whitesmoke" }}>
                                    <div className="document__orders-title">
                                        <p style={{ fontSize: "12px" }}>
                                            Display circulation log
                                        </p>

                                        <button className="document__orders-add"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setIsShownProcess(!isShowProcess)
                                            }}>
                                            <i className={`${isShown ? "fas fa-minus" : "fas fa-plus"}`}> </i>
                                        </button>
                                    </div>
                                </div>
                                {
                                    isShowProcess &&
                                    <DocumentCompleted />
                                }
                            </div>
                            <DocumentUnique/>
                            <div className="document__button-cover">
                                <div className="document__submit" onClick={handleSubmit}>
                                    Submit
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}