import React, { useEffect, useState } from 'react';
import axios from "axios";
import { address } from '../data/data';

const PaymentRequests = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const config = {
            method: 'GET',
            url: `${address.use}/v1/api/user`,
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
        <div className="container">
            <div className="payment__request-wrapper">
                <div className="payment__request-header payment__request-background">
                    <p>Technical assignment for payment form development</p>
                </div>
                <div className="payment__request-gap">

                </div>
                <div className="payment__request-title payment__request-background payment__request-grid">
                    <div className="payment__request-border-r">
                        No
                    </div>
                    <div className="payment__request-border-r">
                        Field Name
                    </div>
                    <div className="payment__request-border-r">
                        Field Type
                    </div>
                    <div>
                        Field Options
                    </div>
                </div>
                <div className="payment__request-gap">

                </div>
                <div className="payment__request-grid payment__request-table">
                    <div
                        className="payment__request-number payment__request-background  payment__request-border-r ">
                        1
                    </div>
                    <div
                        className="payment__request-info  payment__request-background  payment__request-border-r">
                        Initiator
                    </div>

                    <div className="payment__request-fill   payment__request-border-r">
                        <input type="text" placeholder={user.fullName} className="payment__request-input" />
                    </div>
                    <div className="payment__request-options ">

                    </div>
                </div>
                <div className="payment__request-grid payment__request-table">
                    <div className="payment__request-number  payment__request-background  payment__request-border-r ">
                        1
                    </div>
                    <div className="payment__request-info  payment__request-background  payment__request-border-r">
                        Initiator
                    </div>
                    <div className="payment__request-fill  payment__request-border-r">

                    </div>
                    <div className="payment__request-options">
                        <input type="text" placeholder={user.fullName} className="payment__request-input" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequests;