import React from "react";
import Carousel from "./Carousel";
import "./CarouselPage.css";

const CarouselPage = () => {
  const images = [
    "https://i.pinimg.com/564x/37/a8/97/37a8972e88fb8aebab76e152347e0c90.jpg",
    "https://i.pinimg.com/564x/03/48/45/0348459dec19aea0d4c74b1c9a0c746f.jpg",
    "https://i.pinimg.com/564x/f0/b3/da/f0b3da525854a1789ddd7c16978be836.jpg",
    "https://i.pinimg.com/564x/34/ce/c5/34cec5c369aba1009461bf0ce0803806.jpg",
    "https://i.pinimg.com/564x/0d/1b/c4/0d1bc428d20460867e9adee787b303e8.jpg",
    "https://i.pinimg.com/564x/30/e0/11/30e011eed559dc24d9220e1efafa1331.jpg",
  ];
  return (
    <>
      <div className="bg-container">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center pt-10 sm:pt-16 md:pt-20 lg:pt-24 uppercase font-light">
          Men's Polo
        </h1>
        <Carousel images={images} />
        
      </div>
    </>
  );
};

export default CarouselPage;
