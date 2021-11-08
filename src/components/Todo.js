import React from 'react';
import message from '../assets/images/message.svg'

export const Todo = () => {
    return (
        <div className="todo_info">
            <div className="todo_nothing">
                <img src={message} className="todo_message" />
                You have no task <u style={{marginLeft : '5px'}}>to do</u>
            </div>
        </div>
    )
}