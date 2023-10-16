import React, { useState, useRef, useEffect } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PauseCircleOutlineSharpIcon from "@mui/icons-material/PauseCircleOutlineSharp";
import PlayCircleOutlineSharpIcon from "@mui/icons-material/PlayCircleOutlineSharp";

const SlideShow = () => {
  const myVideo = {
    desktop: [
      "//video.ralphlauren.com/202310/20231010-homepage/RL_Polo_Outerwear_FOB_06s_1440x720_DSK.mp4",
      "//video.ralphlauren.com/202308/20230822-prl-heritage-icons-fall-lp/mpolo_heritageicons_hero_dsk.mp4",
      "//video.ralphlauren.com/202310/20231005-mens-lp/PRLxElement-Hero-DSK.mp4",
      "//video.ralphlauren.com/202309/20230914-homepage/20230914 P-Layer_1440x720.mp4",
    ],
    mobile: [
      "//video.ralphlauren.com/202310/20231010-homepage/RL_Polo_Outerwear_FOB_06s_750x1190_MOB.mp4",
      "//video.ralphlauren.com/202308/20230822-prl-heritage-icons-fall-lp/mpolo_heritageicons_hero_dsk.mp4",
    ],
  };

  const post = {
    desktop:
      "https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697353689672/img/202310/10122023-eu-hp/1010_hp_c01_vid.jpg",
    mobile:
      "https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697353689672/img/202310/10122023-eu-hp/1010_hp_m_c01_vid.jpg",
  };

  const [play, setPlay] = useState(true);
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (play) {
        video.pause();
      } else {
        video.play();
      }
      setPlay(!play);
    }
  };

  const handleNext = () => {
    setCurrent((prevIndex) => (prevIndex + 1) % myVideo.desktop.length);
    setPlay(true);
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={post.desktop}
        playsInline
        muted
        loop
        autoPlay
      >
        <source src={myVideo.desktop[current]} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
        <button onClick={handlePlay} aria-label="play/pause button">
          {play ? (
            <PauseCircleOutlineSharpIcon />
          ) : (
            <PlayCircleOutlineSharpIcon />
          )}
        </button>
        <img
          className="w-1/2"
          src="https://cdn-fsly.yottaa.net/620ab0e7d93140aaa4e17365/www.ralphlauren.global/v~4b.8f/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697057520625/img/Brand_Logo_Library/PURPLE-LABEL/201906_purple_label_white_logo.svg?yocs=4G_4K_4N_4O_"
          alt="Ralph Lauren Logo"
        />
        <ArrowCircleRightIcon onClick={handleNext} />
      </div>
    </div>
  );
};

export default SlideShow;
