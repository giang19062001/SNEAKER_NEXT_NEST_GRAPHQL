"use client"
import React, { useEffect, useRef, useState } from "react";
import '../assets/css/slider.css'
const Slider = () => {
  const [sliderActive, setSliderActive] = useState(1)
  const changeSlider = (slider: number) =>{
    setSliderActive(slider)
  }
  return (
  
    <section className="carousel">
    <div className="list">
        <div className={sliderActive === 1 ? 'item active' : 'item'}>
            <figure>
                <img src="img/3.png"/>
            </figure>
            <div className="content">
                <p className="category">
                    Sport Shoes 
                </p>
                <h2>
                    NIKE D.01
                </h2>
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
                </p>
                <div className="more">
                    <button>
                        Add To Cart
                    </button>
                    <button>
                        <i className="fa-solid fa-play"></i> See More
                    </button>
                </div>
            </div>
        </div>
        <div className={sliderActive === 2 ? 'item active' : 'item'}>
            <figure>
                <img src="img/2.png"/>
            </figure>
            <div className="content">
                <p className="category">
                    Sport Shoes 
                </p>
                <h2>
                    NIKE D.02
                </h2>
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
                </p>
                <div className="more">
                    <button>
                        Add To Cart
                    </button>
                    <button>
                        <i className="fa-solid fa-play"></i> See More
                    </button>
                </div>
            </div>
        </div>
        <div className={sliderActive === 3 ? 'item active' : 'item'}>
            <figure>
                <img src="img/1.png"/>
            </figure>
            <div className="content">
                <p className="category">
                    Sport Shoes 
                </p>
                <h2>
                    NIKE D.03
                </h2>
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
                </p>
                <div className="more">
                    <button>
                        Add To Cart
                    </button>
                    <button>
                        <i className="fa-solid fa-play"></i> See More
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div className="arrows">
        <button id="prev"><i className="fa-solid fa-chevron-left"></i></button>
        <button id="next"><i className="fa-solid fa-chevron-right"></i></button>
    </div>
    <div className="indicators">
        <div className="number">01</div>
        <ul>
            <li className={sliderActive === 1 ? 'active' : ''} onClick={()=>changeSlider(1)}></li>
            <li className={sliderActive === 2 ? 'active' : ''} onClick={()=>changeSlider(2)}></li>
            <li className={sliderActive === 3 ? 'active' : ''} onClick={()=>changeSlider(3)}></li>
        </ul>
    </div>
</section>
  );
};

export default Slider;
