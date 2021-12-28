import React, {useEffect, useState} from 'react'
// import slider from '../assets/images/test-slider.jpg'
import dataSlider from "./dataSlider"
import BtnSlider from "./BtnSlider";

export const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length)
            setSlideIndex(slideIndex + 1)
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1)
            setSlideIndex(slideIndex - 1)
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }
    return (
        <div className="slider">
            {dataSlider.map((obj,index) => {
                    return (
                      <div className={slideIndex === index + 1 ? "slide active-anim" : "slide"} key={obj.id}>
                          <img style={{width: "100%"}} src={process.env.PUBLIC_URL + `/Imgs/${slideIndex}.jpg`} key={obj.id}/>
                      </div>
                        )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
        </div>
    )
}