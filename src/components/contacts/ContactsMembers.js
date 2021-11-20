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
                    console.log(response.data)
                    setMembers({ ...response.data })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [department])

    return (
        <div className="contacts__homepage-item contacts__members">
            {
                members?.employees && (
                    <div className="contacts__members-title">
                        CPL department <span>{members.employees.length + 1}</span> staff
                    </div>
                )
            }
            <p className="contacts__members-subtitle">
                principal
            </p>
            {
                members?.principal && (
                    <Contact employee={members?.principal} setEmployee={setEmployee} />
                )
            }
            <p className="contacts__members-subtitle">
                member
            </p>

            {
                members?.employees?.map(el => (
                    <Contact employee={el} setEmployee={setEmployee} />
                ))
            }
        </div>
    );
};

export default ContactsMembers;