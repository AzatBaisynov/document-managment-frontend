import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { address } from './data/data'
import { NavLink } from 'react-router-dom'

export const NewsManager = () => {

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

    const handleClick = (e) => {
        console.dir(e.target.className.split(" ")[1].replaceAll("rel", ""))

    }

    return (
        <div className="related">
            <div className="task__search">
                <span>
                    Selected:
                </span>
                <input type="text" id="task" placeholder="Enter a keyword" />
                <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
            </div>
            <a href="/notice" target="_blank">Hello</a>
        </div>
    )
}