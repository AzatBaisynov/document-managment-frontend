import React, {useState} from 'react';
import {UniqueInner} from "./UniqueInner";

export const DocumentUnique = () => {
    const [isShown, setIsShown] = useState(false)
    return (
        <>
            <div className="document__unique">
                <p className="document__unique-item ">

                </p>
                <p className="document__unique-item">
                    Start date
                </p>
                <p className="document__unique-item">
                    End Date
                </p>
                <p className="document__unique-item">
                    Original Currency
                </p>
                <p className="document__unique-item">
                    Accomodation Fee
                </p>
                <p className="document__unique-item">
                    Other Fee
                </p>
                <p className="document__unique-item">
                    Subtotal of the original currency
                </p>
                <p className="document__unique-item">
                    Exchange Rate
                </p>
                <p className="document__unique-item">
                    Amount (USD)
                </p>
                <p className="document__unique-item">
                    Travel Days
                </p>
                <p className="document__unique-item">
                    Region
                </p>
                <p className="document__unique-item">
                    Allowance
                </p>
                <p className="document__unique-item">
                </p>
            </div>
            {
                isShown &&
                <div className="document__rows">
                    <UniqueInner/>
                </div>
            }

            <div className="document__unique-more">
                <input type="checkbox" id="radio"/>
                <label htmlFor="radio" className="document__unique-label"> select all</label>
                <i className="far fa-trash-alt document__unique-svg"
                   onClick={(e) => {
                       e.preventDefault()
                       setIsShown(false)
                   }}
                > </i>
                <button className="document__unique-btn document__unique-button-1">
                    <i className="fas fa-arrow-up"> </i>
                </button>
                <button className="document__unique-btn document__unique-button-2" >
                    <i className="fas fa-plus"
                       onClick={(e) => {
                           e.preventDefault()
                           setIsShown(true)
                       }}
                    > </i>
                </button>
                <button className="document__unique-btn document__unique-button-3">
                    <i className="fas fa-arrow-down"> </i>
                </button>
            </div>
        </>

    );
};