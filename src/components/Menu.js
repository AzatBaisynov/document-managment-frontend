import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, MemoryRouter, NavLink } from 'react-router-dom';
import { ToCompleted } from './ToCompleted';
import { Todo } from './Todo';
import { ToRead } from './ToRead';

export const Menu = ({ actions, minh, scroll }) => {
    return (
        <MemoryRouter >
            <div className="menu">
                <div className="menu_header">
                    {actions.map((el) =>
                        <NavLink
                            exact
                            className="menu_link"
                            to={el.action_link}
                        >{el.action_text}</NavLink>
                    )}
                </div>
                <div 
                className="menu_block" 
                style={{minHeight : minh, maxHeight : minh, overflowY : scroll ? "scroll" : "hidden"}}
                >
                    <Switch>
                        {actions.map((el) =>
                            <Route
                                exact
                                path={el.action_link}
                                component={el.action}
                            />
                        )}
                    </Switch>
                </div>
            </div>
        </MemoryRouter>
    )
}