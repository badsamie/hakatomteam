import React, { useState, useEffect } from "react";
import CarouselPage from "../sabina/CarouselPage";

const SlideShow = () => {
  const [slide, setSlide] = useState(1);
  const totalSlides = 3;

  const nextBtn = () => {
    setSlide((prevSlide) => (prevSlide === totalSlides ? 1 : prevSlide + 1));
  };

  const prevBtn = () => {
    setSlide((prevSlide) => (prevSlide === 1 ? totalSlides : prevSlide - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextBtn();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative">
      <div style={{ display: slide === 1 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202308/20230822-prl-heritage-icons-fall-lp/mpolo_heritageicons_hero_dsk.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div style={{ display: slide === 2 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202310/20231005-mens-lp/PRLxElement-Hero-DSK.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div style={{ display: slide === 3 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202309/20230914-homepage/20230914 P-Layer_1440x720.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
        <button
          className="bg-opacity-10 text-white text-xl py-2 px-4 rounded"
          onClick={prevBtn}
        >
          🡄
        </button>
        <img
          className="w-auto h-auto"
          src="https://cdn-fsly.yottaa.net/620ab0e7d93140aaa4e17365/www.ralphlauren.global/v~4b.8f/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697057520625/img/Brand_Logo_Library/PURPLE-LABEL/201906_purple_label_white_logo.svg?yocs=4G_4K_4N_4O_"
          alt="Ralph Lauren Logo"
        />
        <button
          className="bg-opacity-10 text-white text-xl py-2 px-4 rounded"
          onClick={nextBtn}
        >
          🡆
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
