import React, {useEffect, useState} from 'react';
import axios from "axios";

const PaymentRequests = () => {
    // const info = ["initiator", "Initiated Department", "Initiated Date",
    //     "Invoice Receipt Date", "Payment Deadline", "Payers", "Invoice Content", "Invoice No.",
    //     "Invoice Amount", "Currency", "Exchange Rate", "Converted to KZ", "Invoice Date",
    //     "Invoice Type", "Invoice No.", "Payee", "Payee Account", "Receiving Bank",
    //     "SWIFT Code", "Upload Attachment"]
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
                setUser({...response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])
    return (
        <div className="container">
            <div className="payment__request-wrapper">
                <div className="payment__request-header payment__request-background">
                    <p>
                        Technical assignment for payment form development
                    </p>
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
                        <input type="text" placeholder={user.fullName} className="payment__request-input"/>
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
                        <input type="text" placeholder="Ilzat" className="payment__request-input"/>
                    </div>
                    <div className="payment__request-options">
                        <input type="text" className="payment__request-input-l"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRequests;