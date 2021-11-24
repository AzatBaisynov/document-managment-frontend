import React, {useEffect, useState} from 'react'
import DocumentInput from "./DocumentInput";
import DocumentSubtitle from "./DocumentSubtitle";
import DocumentGrid from "./DocumentGrid";
import DocumentRow from "./DocumentRow";
import DocumentRadio from "./DocumentRadio";
import DocumentSelect from "./DocumentSelect";
import {NavLink, Route, Switch} from "react-router-dom";
import {ContactsHomePage} from "../contacts-pages/ContactsHomePage";
import {ContactsStaffYellowPages} from "../contacts-pages/ContactsStaffYellowPages";
import {MemoryRouter as Router} from "react-router";
import DocumentComment from "./DocumentComment";
import DocumentCheckBox from "./DocumentCheckBox";
import axios from "axios";

export const Document = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const config = {
            method: 'GET',
            url: 'http://109.248.133.36:8080/v1/api/user',
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        axios(config)
            .then(function (response) {
                setUser({ ...response.data })
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (
        <div className="contacts__page">
            <div className="container">
                <Router>
                    <div className="contacts__header">
                        <a href="/" className="contacts__header-logo contacts__header-item">
                            <i className="fas fa-home">

                            </i>
                        </a>
                        <a href="/" className="contacts__header-item"> Homepage</a>
                        <div className="contacts__header-item contacts__header-logo">
                            <i className="fas fa-angle-right">

                            </i>
                        </div>
                        <NavLink to='/address' className="contacts__header-item"> Address Book</NavLink>
                    </div>
                </Router>
                <div className="document">
                    <p className="document__approval">
                        Approval Content
                    </p>
                    <div className="document__cover">
                        <div className="document__title">
                            Payment approval form for company
                        </div>
                        <DocumentGrid/>
                        <DocumentRow/>
                        <div className="document__row_grid">
                            <div className="document__flex">
                                <DocumentSubtitle/>
                                <div>
                                    <DocumentInput user={user.fullName}/>
                                </div>
                            </div>
                            <div className="document__flex">
                                <DocumentSubtitle/>
                                <div>
                                    <DocumentCheckBox user={user}/>
                                </div>
                            </div>
                        </div>
                        <div className="document__row_grid">
                            <div className="document__flex">
                                <DocumentSubtitle/>
                                <div>
                                    <DocumentSelect/>
                                </div>
                            </div>
                            <div className="document__flex">
                                <DocumentSubtitle/>
                                <div>
                                    <DocumentRadio/>
                                </div>
                            </div>
                        </div>
                        <DocumentComment/>
                        <div className="document__row">
                            <div className="document__flex">
                                <div>
                                    <DocumentSubtitle/>
                                </div>
                                <div className="document__checkbox">
                                    <div>
                                        <input type="checkbox" id="scales" name="scales"/>
                                        <label htmlFor="scales">Annual leave</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Round Vacation</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Unpaid leave</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Unpaid leave</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Unpaid leave</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Unpaid leave</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="horns" name="horns"/>
                                        <label htmlFor="horns">Unpaid leave</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}