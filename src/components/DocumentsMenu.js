import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, MemoryRouter, NavLink} from 'react-router-dom';
import {DocumentComponents} from './DocumentComponents';
import PaymentRequests from "./documents/PaymentRequests";
import axios from "axios";

export const DocumentsMenu = ({actions, minh, scroll}) => {
    // const config = {
    //     method: 'get',
    //     url: 'http://109.248.133.36:8080/v1/api/document',
    //     headers: {
    //         'Authorization': localStorage.getItem("token")
    //     }
    // };
    // axios(config)
    //     .then(function (response) {
    //     console.log(response.data)
    //     })
    return (
        <MemoryRouter>
            <div className="menu">
                <div className="menu_header">
                    {actions.map((el, idx) =>
                        <NavLink
                            exact
                            className="menu_link"
                            to={el.action_link}
                            key={idx}
                        >{el.action_text}</NavLink>
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
                                key={idx}
                            >
                                <DocumentComponents category_id={el.action_text}/>
                            </Route>
                        )}
                    </Switch>
                </div>
            </div>
        </MemoryRouter>
    )
}