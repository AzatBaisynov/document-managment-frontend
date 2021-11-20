import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import ContactsOrganisation from "../contacts/ContactsOrganisation";
import ContactsMembers from "../contacts/ContactsMembers";
import ContactsMembersDetails from "../contacts/ContactsMembersDetails";
import axios from 'axios';

export const ContactsHomePage = () => {
    const [departments, setDepartmens] = useState([])
    const [departmentId, setDeparmentId] = useState("")
    const [employee, setEmployee] = useState({})

    useEffect(() => {
        const config = {
            method : 'POST',
            url: 'http://109.248.133.36:8080/v1/api/contacts/list',
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                console.log(response.data)
                setDepartmens([...response.data])
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const changeId = ( id ) => {
        setDeparmentId(id)
    }

    const changeEmployee = ( employee ) => {
        setEmployee(employee)
    }

    return (
        <div>
            <div className="contacts__homepage">
                <ContactsOrganisation departments={departments} setDepartment={changeId} />
                <ContactsMembers department={departmentId} setEmployee={changeEmployee}/>
                <ContactsMembersDetails details={employee}/>
            </div>
        </div>
    );
};

