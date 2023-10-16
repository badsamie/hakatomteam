import React, { useState, useEffect } from "react";

const images = [
  "https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697267275258/img/202309/09142023-eu-m-polo-originals-chapter-1/0914_m_polo_originals_chapter_1_feat_c07_img.jpg",
  "https://cdn-fsly.yottaa.net/620ab0e7d93140aaa4e173…19_purple_label_blp_c01_img.jpg?yocs=4G_4K_4N_4O_",
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen relative overflow-hidden h-[400px]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute w-full h-full object-cover transition-transform duration-1000 ${
            index === activeIndex
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-1 ${
              index === activeIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
