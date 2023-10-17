import React from "react";

const Gallery = () => {
  const images = [
    "https://i.pinimg.com/564x/90/0d/52/900d52df83c585cf59c53f64b7386edd.jpg",
    "https://i.pinimg.com/564x/dc/b7/ee/dcb7ee14c9113b0862dc8e793cdac29d.jpg",
    "https://theimpression.com/wp-content/uploads/2023/09/polo-fall-2023-ad-campaign-the-impression-003.jpg",
  ];

  return (
    <div
      className=" items-center justify-center min-h-screen bg-cover bg-center relative p-10 bg-fixed grid grid-cols-3 gap-6"
      style={{
        backgroundImage:
          "url('https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697267275258/img/202309/09142023-eu-m-polo-originals-chapter-1/0914_m_polo_originals_chapter_1_feat_c07_img.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

      <img
        src={images[0]}
        alt="Gallery Item"
        className="col-span-2 h-auto  object-cover  shadow-lg"
      />

      <img
        src={images[1]}
        alt="Gallery Item"
        className="col-span-1 h-10/12 object-cover  shadow-lg"
      />
      <img
        src={images[2]}
        alt=""
        className="col-span-3  object-cover shadow-lg  h-auto"
      />
    </div>
  );
};

export default Gallery;
