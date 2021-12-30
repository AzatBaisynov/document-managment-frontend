import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { address } from './data/data'

export const Notice = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const configure = {
            method: "GET",
            url: `${address.use}/v1/api/user/bd`,
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }
        axios(configure)
            .then(response => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="notice">
            {
                users.map((el, idx) => (
                    <div key={idx}>
                        <p style={{fontSize : "15px"}}><span style={{color : "#2373c8"}}>[Notice]</span> Happy birthday, {el.fullName}!</p>
                        <br />
                    </div>
                ))
            }
        </div>
    )
}