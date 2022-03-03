import React, { useEffect, useState } from 'react';
import message from '../assets/images/message.svg'
import { address } from './data/data';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import reload from '../assets/images/ref.svg'

export const Todo = () => {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        refresh()
        setTimeout(() => {
            refresh()
        }, 7000)
    }, [])

    const refresh = () => {
        const config = {
            method: 'get',
            url: `${address.use}/v1/api/document`,
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
                У Вас <span style={{ color: "red", margin: "0 5px", fontWeight : "600"}}> {todo[0] ? todo.length : "нет"} задач</span><u>к выполению</u><img onClick={refresh} src={reload} style={{width: "20px", marginLeft: "7px", fill : "#ffae12", cursor: "pointer"}} alt="reload"/>
            </div>
            {
                todo.map((el, idx) => (
                    <div key={idx}>
                        <NavLink to={`/approval/${el.id}`} className="todo_document" target="_blank">
                            <div className="todo_dot_red"></div>Пожалуйста проверьте документ: {el.name} от {el.user.fullName}
                        </NavLink>
                    </div>
                ))
            }
        </div>
    )
}