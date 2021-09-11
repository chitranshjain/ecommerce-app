import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import one from "../../Assets/Banners/1.jpg";
import two from "../../Assets/Banners/2.jpg";
import three from "../../Assets/Banners/3.jpeg";
import four from "../../Assets/Banners/4.jpeg";
import five from "../../Assets/Banners/5.jpeg";
import six from "../../Assets/Banners/6.jpg";

import "./Banners.css";

function Banners() {
  return (
    <Carousel nextLabel="" prevLabel="" indicators={false}>
      <CarouselItem>
        <div className="carousel-image-div">
          <img src={one} alt="one" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="carousel-image-div">
          <img src={two} alt="two" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="carousel-image-div">
          <img src={three} alt="three" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="carousel-image-div">
          <img src={four} alt="four" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="carousel-image-div">
          <img src={five} alt="five" />
        </div>
      </CarouselItem>
    </Carousel>
  );
}

export default Banners;
