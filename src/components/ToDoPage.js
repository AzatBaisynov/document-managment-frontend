import React from 'react';
import {Employee} from "./Employee";
import {Menu} from "./Menu";
import {Task} from "./Task";
import {ToRead} from "./ToRead";

const todos = [
    {
        action_link: "/",
        action_text: "Список задач",
        action: Task
    },
    {
        action_link: "/toread",
        action_text: "Список законченных задач",
        action: ToRead
    },
]
const ToDoPage = () => {
    return (
        <main className="main">
            <div className="container main_container" style={{gridTemplateColumns : "1.5fr 8fr"}}>
                <Employee/>
                <section className="middle">
                    <Menu actions={todos} minh={"400px"} scroll={true}/>
                </section>
            </div>
        </main>
    );
};

export default ToDoPage;