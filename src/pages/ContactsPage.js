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
                <div className="contacts__header">
                    <div className="contacts__header-item contacts__header-logo">
                        <i className="fas fa-home">

                        </i>
                    </div>
                    <NavLink to='/homepage'> <a href="#" className="contacts__header-item">Homepage</a></NavLink>
                    <div className="contacts__header-item contacts__header-logo">
                        <i className="fas fa-angle-right">

                        </i>
                    </div>
                    <NavLink to='/sraffyellowpage'> <a href="#" className="contacts__header-item">Staff yellow pages</a></NavLink>
                    <div className="contacts__header-item contacts__header-logo">
                        <i className="fas fa-angle-right">

                        </i>
                    </div>
                    <NavLink to='/addressbook'> <a href="#" className="contacts__header-item">Address Book</a></NavLink>
                </div>
                <ContactsHomePage/>
            </div>
        </div>
    );
};






