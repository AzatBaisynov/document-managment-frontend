import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, MemoryRouter, NavLink } from 'react-router-dom';
import { Document } from './Document';
import PaymentRequests from "./documents/PaymentRequests";

export const DocumentsMenu = ({ actions, minh, scroll }) => {
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
                    style={{ minHeight: minh, maxHeight: minh, overflowY: scroll ? "scroll" : "hidden" }}
                >
                    <Switch>
                        {actions.map((el, idx) =>
                            <Route
                                exact
                                path={el.action_link}
                                key={idx}
                            >
                                <Document category_id={el.action_id} />
                            </Route>
                        )}
                    </Switch>
                </div>
            </div>
        </MemoryRouter>
    )
}