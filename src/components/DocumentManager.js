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
            url: `${address.use}/v1/api/document/documents/get-all`,
        }

        axios(params)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, [])

    const processCheck = (num) => {
        if (num) {
            return num === 1 ? "In process" : 'processed'
        }
    }


    return (
        <div className="related">
            <div className="task__search">
                <span>
                    Selected:
                </span>
                <input type="text" id="task" placeholder="Введите ключевое слово"/>
                <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
            </div>
            <div className="related__grid" style={{gridTemplateColumns : "1fr 1fr 1fr 1fr 1fr 1fr", textAlign : "center"}}>
                <p className="related__title">Seq</p>
                <p className="related__title">Тема</p>
                <p className="related__title">№</p>
                <p className="related__title ">Иницатор</p>
                <p className="related__title">Дата</p>
                <p className="related__title">Статус файла</p>
            </div>
            {
                data.map((el, idx) => (
                    <NavLink to={`/read/${el.id}`} className="todo_document" target="_blank">
                    <div className="related__grid document__manager" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", textAlign: "center", fontSize : "13px"}}>
                        <p className="document__manager-item"> {++idx} </p>
                        <p className="document__manager-item"> {el.name}</p>
                        <p className="document__manager-item"> {el.id}</p>
                        <p className="document__manager-item initiator__title"> {el.user.fullName}</p>
                        <p className="document__manager-item"> {el.dateCreated.replaceAll("-", "/").split("T")[0]}</p>
                        <p className="document__manager-item"> {processCheck(el.status)}</p>
                    </div>
                    </NavLink>
                ))
            }
        </div>
    )
}