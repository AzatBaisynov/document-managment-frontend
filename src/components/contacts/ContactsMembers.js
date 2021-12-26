import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Contact } from './Contact';

const ContactsMembers = ({ department, setEmployee }) => {
    const [members, setMembers] = useState({})

    useEffect(() => {
        if (department) {
            const config = {
                method: 'GET',
                url: `http://109.248.133.36:8080/v1/api/contacts/${department}`,
                headers: {
                    'Authorization' : localStorage.getItem("token")
                }
            }
            axios(config)
                .then(function (response) {
                    setMembers({ ...response.data })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [department])

    const principalChecker = (contact, principal) => {
        console.log(contact)
        console.log(principal)
        if (contact.id !== principal.id) 
        return (
            <Contact employee={contact} setEmployee={setEmployee} key={contact.id}/>
        )
    }

    return (
        <div className="contacts__homepage-item contacts__members">
            {
                members?.employees && (
                    <div className="contacts__members-title">
                        CPL department <span>{members.employees.length}</span> staff
                    </div>
                )
            }
            <p className="contacts__members-subtitle">
                principal
            </p>
            {
                members?.principal && (
                    <Contact employee={members?.principal} setEmployee={setEmployee}/>
                )
            }
            <p className="contacts__members-subtitle">
                members
            </p>

            {
                members?.employees?.map(el => principalChecker(el, members?.principal))
            }
        </div>
    );
};

export default ContactsMembers;