import React from 'react';
import '../assets/App.css';
import {MemoryRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import {ContactsHomePage} from "../components/contacts-pages/ContactsHomePage";
import {ContactsAddressBook} from "../components/contacts-pages/ContactsAddressBook";
import {ContactsStaffYellowPages} from "../components/contacts-pages/ContactsStaffYellowPages";
import ContactsOrganisation from "../components/contacts/ContactsOrganisation";
import ContactsMembers from "../components/contacts/ContactsMembers";
import ContactsMembersDetails from "../components/contacts/ContactsMembersDetails";

export const ContactsPage = () => {
    return (
        <div className="contacts__page">
            <div className="container">
                <Router>
                    <div className="contacts__header">
                        <a href="/" className="contacts__header-logo contacts__header-item">
                            <i className="fas fa-home">

                            </i>
                        </a>
                        <a href="/" className="contacts__header-item"> Homepage</a>
                        <div className="contacts__header-item contacts__header-logo">
                            <i className="fas fa-angle-right">

                            </i>
                        </div>
                        {/* <NavLink to='/staff' className="contacts__header-item">Staff yellow pages</NavLink>
                        <div className="contacts__header-item contacts__header-logo">
                            <i className="fas fa-angle-right"> </i>
                        </div> */}
                        <NavLink to='/address' className="contacts__header-item"> Address Book</NavLink>
                    </div>
                    <Switch>
                        <Route exact path="/" component={ContactsHomePage}/>
                        <Route exact path="/staff" component={ContactsStaffYellowPages}/>
                        <Route exact to="/address" component={ContactsHomePage}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
};






