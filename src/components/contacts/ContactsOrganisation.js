import React, { useEffect } from 'react';

const ContactsOrganisation = ({ departments, setDepartment }) => {

    useEffect(()=> {
        departments.forEach( el => {
            if (el.used) {
                setDepartment(`department/${el.department.id}`)
            }
        });
    }, [departments])

    const toggleActive = (e) => {
        if (!e.target.className.includes("fas")) {
            setDepartment(`department/${e.target.className}`)
        }
        if (e.target.parentNode.className === 'class_dropdown') {
            e.target.parentNode.className = 'class_dropdown active'
        } else {
            e.target.parentNode.className = 'class_dropdown'
        }
    }

    const handleClick = (e) => {
        setDepartment(`sub/${e.target.className.split(" ")[1]}`)
    }
    
    return (
        <div className="contacts__homepage-item contacts__organisation">
            <label htmlFor="search" className="contacts__organisation-search-label">
                <i className="fas fa-search" />
            </label>
            <input type="search" placeholder="keywords" className="contacts__organisation-search" id="search" />
            {
                departments.map(dep => (
                    <nav className="class_dropdown" key={dep.department.id} >
                        <button onClick={toggleActive} className={dep?.department?.id}><i className="fas fa-caret-right contacts__caret" > </i> {dep?.department?.department}</button>
                        <div className="class_dropdown-child">
                        {
                            dep?.subDepartments?.map(sub => (
                                <a href="#" className={`class_link ${sub?.id}`} key={sub?.id} onClick={handleClick}>{sub?.subDepartment}</a>
                            ))
                        }
                        </div>
                    </nav>
                ))
            }
        </div>
    );
};

export default ContactsOrganisation;