import React from "react";
import Slider from "react-slick";
import "./Carousel.css";

const Carousel = ({ images = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    cssEase: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  };

  return (
    <div className="block">
      <div className="block-right">
        <div className="carousel-container">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`carousel-img-${index}`}
                  className="w-full h-auto max-h-96 md:max-h-[500px] lg:max-h-[600px]"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
