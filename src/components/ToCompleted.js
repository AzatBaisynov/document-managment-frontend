import React,{useEffect, useState} from 'react';
import { address } from './data/data';
import axios from 'axios';
import message from '../assets/images/message.svg'
import { NavLink } from 'react-router-dom';
import reload from '../assets/images/ref.svg'

export const ToCompleted = () => {

    const [todo, setTodo] = useState([])

    useEffect(() => {
        refresh()
    }, [])

    const refresh = () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document/completed/mini`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };

        axios(config)
            .then(function (response) {
                setTodo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="todo_info">
            <div className="todo_nothing">
                <img src={message} className="todo_message" />
                У Вас <span style={{ color: "red", margin: "0 5px", fontWeight: "600" }}> {todo[0] ? todo.length : "нет"} </span><u>выполненных задач</u><img onClick={refresh} src={reload} style={{width: "20px", marginLeft: "7px", fill : "#ffae12", cursor: "pointer"}} alt="reload"/>
            </div>
            {
                todo.map((el, idx) => (
                    <div key={idx}>
                        <NavLink to={`/complete/${el.id}`} className="todo_document" target="_blank">
                            <div className="todo_dot_red" style={{background: "green"}}></div>Please view the following document: {el.name} from {el.user.fullName}
                        </NavLink>
                    </div>
                ))
            }
        </div>
    )
}