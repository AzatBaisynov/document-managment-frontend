import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import ContactsOrganisation from "../contacts/ContactsOrganisation";
import ContactsMembers from "../contacts/ContactsMembers";
import ContactsMembersDetails from "../contacts/ContactsMembersDetails";
import axios from 'axios';
import { address } from '../data/data';

export const ContactsHomePage = () => {
    const [departments, setDepartmens] = useState([])
    const [departmentId, setDeparmentId] = useState("")
    const [employee, setEmployee] = useState({})
    const [departmentName, setDepartmentName] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        const config = {
            method: 'POST',
            url: `${address.use}/v1/api/contacts/list`,
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                setDepartmens([...response.data])
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        if (departmentId) {
        const dep = departments.find((el, idx) => el.department.id === +departmentId.split("/")[1])
        setDepartmentName(dep.department.department)
        }
    }, [departmentId])

    const changeId = (id) => {
        setDeparmentId(id)
    }

    const changeEmployee = (employee) => {
        setEmployee(employee)
    }

    
    return (
        <div>
            <div className="contacts__homepage">
                <ContactsOrganisation departments={departments} setDepartment={changeId} />
                <ContactsMembers department={departmentId} setEmployee={changeEmployee} departmentName={departmentName} />
                <ContactsMembersDetails details={employee} />
            </div>
        </div>
    )
};

