import React, { useEffect } from 'react';
import Img from "../contacts/../../assets/images/men.png"
import Scan from "../contacts/../../assets/images/scan.png"
import Gender from "../contacts/../../assets/images/gender.png"

const ContactsMembersDetails = ({ details }) => {
    return (
        <div className="contacts__homepage-item">
            {details.fullName ? (
            <div>
                <div className="contacts__homepage-container ">

                    <div className="contacts__member-details-img-cover">
                        <div className="contacts__member-details-img">
                            <img src={Img} alt="" className="contacts__member-details-img-men" />
                            <img src={Gender} alt="" className="contacts__member-details-img-absolute" />
                        </div>

                    </div>
                    <p className="contacts__members-title flex">
                        {details.fullName}
                    </p>

                    <p className="contacts__homepage-info">Employee info:</p>
                        <div className="contacts__homepage-descriptions">
                            <p className="contacts__homepage-info">Mobile Phone
                                <span> {details?.phone} </span>
                            </p>
                            <p className="contacts__homepage-info">Email
                                <span> {details?.email} </span>
                            </p>
                            <p className="contacts__homepage-info">Post
                                <span> {details?.postId?.position} </span>
                            </p>
                        </div>
                    <div className="contacts__homepage-scan">
                        <div className="contacts__homepage-scan-img">
                            <img src={Scan} alt="" />
                        </div>
                        <p className="contacts__homepage-scan-desc">
                            Scan this to add the people's <br />
                            information to Contact list
                        </p>
                    </div>

                </div>
            </div>) : <div style={{display: "flex", alignItems: "center", height: "100%"}}><img style={{width: "100%"}} src="https://financialadvisors.com/media/no-images/nodata-found.png"></img></div>}
        </div>
    );
};

export default ContactsMembersDetails;