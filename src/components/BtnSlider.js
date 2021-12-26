import React from 'react';


const BtnSlider = ({direction, moveSlide}) => {
    return (
        <button className={direction === "next" ? "btn-slide next" : "btn-slide prev"} onClick={moveSlide}>
            <i className={direction === "next" ? "fas fa-arrow-right" : "fas fa-arrow-left"}>

            </i>
        </button>
    );
};

export default BtnSlider;