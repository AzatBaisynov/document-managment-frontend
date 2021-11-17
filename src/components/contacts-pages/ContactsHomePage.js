import React from 'react';
import {NavLink} from "react-router-dom";
import ContactsOrganisation from "../contacts/ContactsOrganisation";
import ContactsMembers from "../contacts/ContactsMembers";
import ContactsMembersDetails from "../contacts/ContactsMembersDetails";

export const ContactsHomePage = () => {
    return (
        <div className="container">
            <div className="contacts__homepage">
                <ContactsOrganisation/>
                <ContactsMembers/>
                <ContactsMembersDetails/>
            </div>
        </div>
    );
};

