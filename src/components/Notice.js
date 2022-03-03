import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { address } from './data/data'

export const Notice = () => {
    const [notices, setNotices] = useState([])

    useEffect(() => {
        const config = {
            method: "get",
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            url: `${address.use}/v1/api/notice`
        }
        axios(config)
            .then(({ data }) => {
                console.log(data)
                setNotices(data)
            })
    }, [])

    return (
        <div className="notice">
            {
                notices.map((el, idx) => (
                    <NavLink to={`/notice/${el.id}`} target="_blank" key={idx}>
                    <div key={idx} style={{display: "flex", justifyContent: "space-between", marginBottom : "15px"}}>
                            <p style={{ fontSize: "15px" }}><span style={{ color: "#12b622" }}>[Уведомление]</span> {el.title}</p>
                        <p>{el?.dateCreated?.replaceAll("-", "/").replace("T", " ").substr(0, 11)}</p>
                    </div>
                    </NavLink>
                ))
            }
        </div>
    )
}