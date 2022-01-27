import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { address } from './data/data'

export const NewsManager = () => {

    const [notices, setNotices] = useState([])

    const documentnotice = {
        title: "Happy birthday, Assem!",
        date: "01/18/2022 12:02",
        author: "DianaTussupkhanova",
        second_title: "Happy birthday, Assem!",
        comment: "We wish you all the best on this special day, the 18th of January 2022,and hope for more good things to come!May your life be full of joy, surprises, and fun!"
    }
    const [notice, setNotice] = useState({})

    useEffect(() => {
        setNotice(documentnotice)
        const config = {
            method: "get",
            headers : {
                "Authorization" : localStorage.getItem("token")
            },
            url : `${address.use}/v1/api/notice`
        }
        axios(config)
        .then(({data}) => {
            console.log(data)
            setNotices(data)
        })
    }, [])

    return (
        <div className="related">
            <div className="task__search news__search">
                <div>
                    <span>
                        Selected:
                    </span>
                    <input type="text" id="task" placeholder="Enter a keyword" />
                    <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
                </div>
                <a href="/documentnotice" target="_blank" className="document__manager-btn">
                    add
                </a>

            </div>
            {
                notices?.map((el, idx) => (
                    <NavLink to={`/notice/${el.id}`} target="_blank" key={idx}>
                    <div className="news__manager-wrapper" >
                        <div className="notice__flex">
                            <div className="notice__number">
                                {++idx}
                            </div>
                            <h4 className="news__manager-title">
                                {
                                    el.title
                                }
                            </h4>
                        </div>
                        <div className="news__manager-grid">
                            <p>
                                <span className="notice__item notice__author">
                                    Author:
                                </span>
                                <span className="news__name">
                                    {
                                        el.user.fullName
                                    }
                                </span>
                            </p>
                            <span className="notice__item">
                                Department: {el.user.department.department}
                            </span>
                            <span className="notice__item">
                                    Publishing date: {el.dateCreated.replaceAll("-", "/").split("T")[0]}
                            </span>
                        </div>
                    </div>
                    </NavLink>
                ))
            }            
        </div>
    )
}