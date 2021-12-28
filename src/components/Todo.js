import React, { useEffect, useState } from 'react';
import message from '../assets/images/message.svg'
import { address } from './data/data';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const Todo = () => {
    const [todo, setTodo] = useState([])

    useEffect(() => {
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
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <div className="todo_info">
            <div className="todo_nothing">
                <img src={message} className="todo_message" />
                You have <span style={{ color: "red", margin: "0 5px" }}> {todo ? todo.length : "no"} </span> task <u style={{ marginLeft: '5px' }}>to do</u>
            </div>
            {
                todo.map((el, idx) => (
                    <div key={idx}>
                        <NavLink to={`/approval/${el.id}`} className="todo_document"  target="_blank">
                            <div className="todo_dot_red"></div>Please view the following document: {el.name} from {el.user.fullName}
                        </NavLink>
                    </div>
                ))
            }
        </div>
    )
}