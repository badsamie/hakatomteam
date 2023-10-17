import React, { useState, useEffect } from "react";

const Slider = () => {
  const images = [
    "https://aniekanudo.com/wp-content/uploads/PRL_01.jpg",
    "https://img.brandshop.ru/cache/products/n/news-slider--polo-ralph-lauren-istoria-brenda-2_1040x695.jpg",
    "https://robbreport.com/wp-content/uploads/2022/09/polo-originals-1.jpg?w=1000",
    "https://www.thefashionisto.com/wp-content/uploads/2018/10/POLO-Ralph-Lauren-Fall-Winter-2018-Campaign-001.jpg",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  h-[500px] overflow-hidden ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute w-full h-full object-cover transition-transform duration-1000 transform ${
            index === activeIndex ? "translate-x-0" : "translate-x-full"
          }`}
        />
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white w-9 "
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white w-9"
      >
        →
      </button>

      <div className="absolute bottom-4 left-4 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-1 ${
              index === activeIndex ? "bg-gray-600" : "bg-gray-400 "
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
