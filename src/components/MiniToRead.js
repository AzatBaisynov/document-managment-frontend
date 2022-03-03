import axios from 'axios'
import React, { useEffect, useState } from 'react'
import message from '../assets/images/message.svg'
import reload from '../assets/images/ref.svg'
import { address } from './data/data'
import { NavLink } from 'react-router-dom'

export const MiniTiRead = () => {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/read`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
        .then((res) => {
            setTodo(res.data)
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="todo_info">
        <div>
            <div className="todo_nothing">
                <img src={message} className="todo_message" />
                У Вас <span style={{ color: "red", margin: "0 5px", fontWeight: "600" }}> {todo[0] ? todo.length : "нет"} задач</span> <u>для чтения</u><img onClick={refresh} src={reload} style={{width: "20px", marginLeft: "7px", fill : "#ffae12", cursor: "pointer"}} alt="reload"/>
            </div>
        </div>
        {
                todo.map((el, idx) => (
                    <div key={idx}>
                        <NavLink to={`/read/${el.document.id}`} className="todo_document" target="_blank">
                            <div className="todo_dot_red"></div>Пожалуйста проверьте документ: {el.document.name} от {el.creator.fullName}
                        </NavLink>
                    </div>
                ))
            }
        </div>
    )
}