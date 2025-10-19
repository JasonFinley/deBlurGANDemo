"use client"

import "./comparison.css"
import { useEffect } from "react";
import { CgShapeHalfCircle } from "react-icons/cg";

const SliderIcon = () =>{
    return (
        <div className="relative">
            <div className="flex items-center justify-between w-24 text-3xl text-white">
                <div>
                    <CgShapeHalfCircle/>
                </div>
                <div className="rounded-full bg-white p-1">
                    <div className="w-6 h-6 bg-stone-500 rounded-full"/>
                </div>
                <div className="rotate-180">
                    <CgShapeHalfCircle/>
                </div>
            </div>
        </div>
    )
}

const ComparisonImage = ({ imageA, imageB }) => {

    useEffect( () => {
        const slider = document.querySelector(".image-comparison .image-slider");
        const sliderLine = document.querySelector(".image-comparison .image-slider-line");
        const sliderIcon = document.querySelector(".image-comparison .image-slider-icon");
        const beforeImage = document.querySelector(".image-comparison .before-image");

        slider.addEventListener( "input", (e) => {
            const value = e.target.value + "%";
            if( beforeImage ) beforeImage.style.width = value;
            if( sliderLine ) sliderLine.style.left = value;
            if( sliderIcon ) sliderIcon.style.left = value;
        });

    }, [] );

    return (
        <div className="image-comparison">
            <div className="images-container">
                <img className="before-image" src={imageA} alt="image comparison" />
                <img className="after-image" src={imageB} alt="image comparison"/>
            </div>

            <div className="image-slider-line"/>
            <div className="image-slider-icon">
                <SliderIcon/>
            </div>
            
            <input type="range" className="image-slider" min={0} max={100}/>

        </div>
    )
}

export default ComparisonImage;