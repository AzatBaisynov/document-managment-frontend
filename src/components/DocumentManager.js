import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {address} from './data/data'
import {NavLink} from 'react-router-dom'

export const DocumentManager = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const params = {
            'method': "get",
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            url: `${address.use}/v1/api/document/related`,
        }

        axios(params)
            .then(res => {
                setData(res.data)
            })
    }, [])


    return (
        <div className="related">
            <div className="task__search">
                <span>
                    Selected:
                </span>
                <input type="text" id="task" placeholder="Enter a keyword"/>
                <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
            </div>
            <div className="document__manager-add">
                <button className="document__manager-btn">
                    add
                </button>
            </div>
            <div className="related__grid">
                <p className="related__title">Seq</p>
                <p className="related__title">Subject</p>
                <p className="related__title">No</p>
                <p className="related__title ">Initiator</p>
                <p className="related__title">Init date</p>
                <p className="related__title">File status</p>
                <p className="related__title">Current process</p>
                <p className="related__title">Current Step</p>
            </div>
            <div className="related__grid document__manager">
                <p className="document__manager-item"> 1 </p>
                <p className="document__manager-item"> Hello</p>
                <p className="document__manager-item"> Hello</p>
                <p className="document__manager-item initiator__title"> Hello</p>
                <p className="document__manager-item"> Hello</p>
                <p className="document__manager-item"> Hello</p>
                <p className="document__manager-item"> Hello</p>
                <p className="document__manager-item"> Hello</p>
            </div>
        </div>
    )
}