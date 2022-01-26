import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, MemoryRouter, NavLink} from 'react-router-dom';
import { address } from './data/data';
import {DocumentComponents} from './DocumentComponents';
import PaymentRequests from "./documents/PaymentRequests";
import {DocumentsMenu} from "./DocumentsMenu";


export const Menu = ({actions, minh, scroll}) => {

    const [todos, setTodos] = useState(0)
    const [toread, setToread] = useState(0)
    const [completed, setCompleted] = useState(0)


    const handleDrawer = (el, idx) => {

        if (el.action_text === "To do") {

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
                        setTodos(response.data.length);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            refresh()
            setInterval(refresh, 7000)

            return (
                <NavLink
                    exact
                    className="menu_link"
                    to={el.action_link}
                    key={idx}
                >{`${el.action_text}`}{todos ? <span className="mini__todo">{todos}</span> : ""}</NavLink>
            )
            
        } else if (el.action_text === "To be read") {


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
                        setToread(res.data.length)
                    })
                    .catch(err => console.log(err))
            }

            refresh()
            setInterval(refresh, 7000)

            return (
                <NavLink
                    exact
                    className="menu_link"
                    to={el.action_link}
                    key={idx}
                >{`${el.action_text}`}{toread ? <span className="mini__todo">{toread}</span> : ""}</NavLink>
            )

        } else if (el.action_text === "Completed") {

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
                        setCompleted(response.data.length);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            refresh()
            setInterval(refresh, 7000)

            return (
                <NavLink
                    exact
                    className="menu_link"
                    to={el.action_link}
                    key={idx}
                >{`${el.action_text}`}{completed ? <span className="mini__todo">{completed}</span> : ""}</NavLink>
            )

        }
 
        return (
            <NavLink
                exact
                className="menu_link"
                to={el.action_link}
                key={idx}
            >{`${el.action_text}`}</NavLink>
        )
    }

    return (
        <MemoryRouter>
            <div className="menu">
                <div className="menu_header">
                    {actions.map((el, idx) => handleDrawer(el, idx)
                    )}
                </div>
                <div
                    className="menu_block"
                    style={{minHeight: minh, maxHeight: minh, overflowY: scroll ? "scroll" : "hidden"}}
                >
                    <Switch>
                        {actions.map((el, idx) =>
                            <Route
                                exact
                                path={el.action_link}
                                component={el.action}
                                key={idx}
                            />
                        )}
                    </Switch>
                </div>
            </div>
        </MemoryRouter>
    )
}