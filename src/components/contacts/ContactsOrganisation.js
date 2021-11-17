import React from 'react';

const toggleActive = (e) => {
    if (e.target.parentNode.className === 'class_dropdown') {
        e.target.parentNode.className = 'class_dropdown active'
    } else {
        e.target.parentNode.className = 'class_dropdown'
    }
}
const ContactsOrganisation = () => {
    return (
        <div className="contacts__homepage-item contacts__organisation">
            <label htmlFor="search" className="contacts__organisation-search-label">
                <i className="fas fa-search">

                </i>
            </label>
            <input type="search" placeholder="keywords" className="contacts__organisation-search" id="search"/>
            <nav className="class_dropdown">
                <button onClick={toggleActive}><i className="fas fa-caret-right contacts__caret"> </i> Link</button>
                <div className="class_dropdown-child">
                    <a href="#" className="class_link">CNPC</a>
                    <a href="#" className="class_link">RICHFIT BeiJing</a>
                    <a href="#" className="class_link">ITMMS</a>
                    <a href="#" className="class_link">HelpDesk</a>
                    <a href="#" className="class_link">OA PC Client Downloads</a>
                </div>
            </nav>
        </div>
    );
};

export default ContactsOrganisation;