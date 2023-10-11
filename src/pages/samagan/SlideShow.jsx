import React, { useState, useEffect } from "react";

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides ? 1 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 1 ? totalSlides : prevSlide - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div style={{ display: currentSlide === 1 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202308/20230822-prl-heritage-icons-fall-lp/mpolo_heritageicons_hero_dsk.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div style={{ display: currentSlide === 2 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202310/20231005-mens-lp/PRLxElement-Hero-DSK.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div style={{ display: currentSlide === 3 ? "block" : "none" }}>
        <video className="w-full h-full" autoPlay muted loop playsInline>
          <source
            src="//video.ralphlauren.com/202309/20230914-homepage/20230914 P-Layer_1440x720.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <button onClick={goToPrevSlide} className="rlc-buttons">
        Previous
      </button>
      <button onClick={goToNextSlide} className="rlc-buttons">
        Next
      </button>
    </div>
  );
};

export default SlideShow;
