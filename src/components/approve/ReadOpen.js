import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { address } from "../data/data";

export const ReadOpen = () => {
    const { id } = useParams()
    const [add, setAdd] = useState(false)
    const [users, setUsers] = useState([])
    const [readerId, setReaderId] = useState("1")
    const [reads, setReads] = useState([])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/users`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
            .then((res) => {
                // console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/read/${id}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
            .then((res) => {
                // console.log(res.data)
                setReads(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const counter = (str1, str2, count) => {
        const l1 = str1.length
        const l2 = str2.length
        let result = []
        for (let i = 0; i < count - l1; i++) {
            result = [...result, ' .']
        }
        return result.join("")
    }

    const handleChange = (e) => {
        setReaderId(e.target.value)
    }

    const handleSaveRead = (e) => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/read/${id}/${readerId}`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
            .then((res) => {
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const dateCutter = (dateForCut) => {
        if (dateForCut)
        return `${dateForCut.substring(0 , 10)} ${dateForCut.substr(11, 8)}`
        return ""
    }

    return (
        <div className="read">
            <table className="table">
                <thead>
                    <tr>
                        <th>Seq</th>
                        <th>Reader</th>
                        <th>Submitted time</th>
                        <th>Reading time</th>
                        <th>Department</th>
                        <th>Reading stage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reads.map((el, idx) => (
                            <tr>
                                <td>{idx+1}</td>
                                <td>{el.reader.fullName}</td>
                                <td>{dateCutter(el.dateCreated)}</td>
                                <td>{dateCutter(el.dateUpdated)}</td>
                                <td>{el.reader.department.department}</td>
                                <td>{el.stage}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <br />
            <p>Add new user to read:</p>
            <br />
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <select className="read__select" onChange={handleChange} >
                                {
                                    users.map((el, idx) => (
                                        <option key={idx} value={el?.id}>{el?.fullName}{counter(el?.fullName, el?.postId.position, 25)}{el?.postId.position}{counter(el?.fullName, el?.postId.position, 30)}{el?.department.department}</option>
                                    ))
                                }
                            </select>
                        </td>
                        <td style={{ padding: "0", width: "150px" }}>
                            <button onClick={handleSaveRead} className="read__btn">Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}