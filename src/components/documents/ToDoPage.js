import React from 'react';
import {Employee} from "../Employee";
import {Menu} from "../Menu";
import {DocumentsMenu} from "../DocumentsMenu";
import {Task} from "../Task";
import {ToRead} from "../ToRead";
import {ToCompleted} from "../ToCompleted";

const todos = [
    {
        action_link: "/",
        action_text: "Task List",
        action: Task
    },
    {
        action_link: "/toread",
        action_text: "Completed Task List",
        action: ToRead
    },
]
const ToDoPage = () => {
    return (
        <main className="main">
            <div className="container main_container">
                <Employee/>
                <section className="middle">
                    <Menu actions={todos} minh={"400px"} scroll={true}/>
                </section>
            </div>
        </main>
    );
};

export default ToDoPage;