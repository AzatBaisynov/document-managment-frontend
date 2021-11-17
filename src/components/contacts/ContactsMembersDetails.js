import React from 'react';
import Img from "../contacts/../../assets/images/men.png"
import Scan from "../contacts/../../assets/images/scan.png"
import Gender from "../contacts/../../assets/images/gender.png"

const ContactsMembersDetails = () => {
    return (
        <div className="contacts__homepage-item">
            <div className="contacts__homepage-container ">

              <div className="contacts__member-details-img-cover">
                  <div className="contacts__member-details-img">
                      <img src={Img} alt="" className="contacts__member-details-img-men"/>
                      <img src={Gender} alt="" className="contacts__member-details-img-absolute"/>
                  </div>

              </div>
                <p className="contacts__members-title flex">
                    Dariyev Dastan
                </p>

                <p className="contacts__homepage-info">Mobile Phone</p>

                <div className="flex">
                    <div className="contacts__homepage-descriptions">

                        <p className="contacts__homepage-info">Mobile Phone
                            <span> 8-747-318-41-58 </span>
                        </p>
                        <p className="contacts__homepage-info">Mobile Phone
                            <span> 8-747-318-41-58 </span>
                        </p>
                        <p className="contacts__homepage-info">Mobile Phone
                            <span> 8-747-318-41-58 </span>
                        </p>

                    </div>
                </div>

                <p className="contacts__homepage-info">SignatureName</p>
                <div className="contacts__homepage-scan">
                    <div className="contacts__homepage-scan-img">
                        <img src={Scan} alt=""/>
                    </div>
                    <p className="contacts__homepage-scan-desc">
                        Scan this to add the people's <br/>
                        information to Contact list
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ContactsMembersDetails;