import React from 'react';
import Img from "../contacts/../../assets/images/men.png"

const ContactsMembers = () => {
    return (
        <div className="contacts__homepage-item contacts__members">
            <div className="contacts__members-title">
                CPL department <span>8</span> staff
            </div>
            <p className="contacts__members-subtitle">
                principal
            </p>
            <div className="contacts__principal">
                <div className="contacts__members-item-img">
                    <img src={Img} alt=""/>
                </div>
                <a href="#" className="contacts__principal-link"> Dariev Dastan</a>
            </div>
            <p className="contacts__members-subtitle">
                member
            </p>
            <div className="contacts__members-item">
                <div className="contacts__members-item-img">
                    <img src={Img} alt=""/>
                </div>
                <a href="#" className="contacts__members-link"> Dariev Dastan</a>
            </div>
        </div>
    );
};

export default ContactsMembers;