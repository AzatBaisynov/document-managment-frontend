import React, { useEffect, useState } from 'react';
import message from '../assets/images/message.svg'
import { address } from './data/data';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import notFound from '../assets/images/not-found.png'

export const Task = () => {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        refresh()
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
        <>
            <div className="task__search">
                <span>
                    Найти:
                </span>
                <input type="text" id="task" placeholder="Введите значение" />
                <label htmlFor="task" className="task__label"> <i className="fas fa-search task__svg"> </i></label>
            </div>
            {
                todo[0] ? todo.map((el, idx) => (
                    <NavLink to={`/approval/${el.id}`} className="todo_document" target="_blank">
                        <div className="task__todo">
                            <p className="task__title__todo">{idx + 1} <div className="todo_dot_red" style={{ background: "red", padding: "1px" }}></div> <span style={{ color: 'red' }}>[in Progress]</span> Пожалуйста проверьте документ: {el.name} от {el.user.fullName}</p>
                            <div className="task__info">
                                <p className="task__subdesc">Инициатор: {el.user.fullName}</p>
                                <p className="task__subdesc">Дата создания: {`${el?.dateCreated.substring(0, 10)} ${el?.dateCreated.substring(11, 19)}`}</p>
                                <p className="task__subdesc">Категория документа: {el.documentCategory.name}</p>
                                <div>&#9872;</div>
                            </div>
                        </div>
                    </NavLink>
                )) :
                    <div className="task__cover">
                        <div className="task__item">
                            <img src={notFound} className="task__img" />
                            <div className="task__content">
                                <p className="task__title">
                                    Не найдено!
                                </p>
                                <span className="task__desc">
                                    Попробуйте другой запрос
                                </span>
                                <hr className="task__border" />
                                <div className="task__col">
                                    <span className="task__desc"> Possible Causes: </span>
                                    <ul>
                                        <li className="task__desc">No view permissions</li>
                                        <li className="task__desc">The record is empty</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}