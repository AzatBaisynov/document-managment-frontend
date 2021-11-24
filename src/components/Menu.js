import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, MemoryRouter, NavLink} from 'react-router-dom';
import {DocumentComponents} from './DocumentComponents';
import PaymentRequests from "./documents/PaymentRequests";
import {DocumentsMenu} from "./DocumentsMenu";

class Document extends React.Component {
    render() {
        return null;
    }
}

export const Menu = ({actions, minh, scroll}) => {
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
                                component={el.action}
                                key={idx}
                            />
                        )}
                    </Switch>
                  <DocumentComponents/>
                </div>
            </div>
        </MemoryRouter>
    )
}