import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  getCategories,
} from "../../store/products/productsActions";
import Slider from "react-slick";

const ProductCreate = () => {
  const { categories } = useSelector((state) => state.products);
  const [product, setProduct] = useState({
    name: "",
    picture: "",
    price: 0,
    description: "",
    type: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div 
    className="flex items-center justify-center h-screen bg-cover bg-center relative" 
    style={{ 
      backgroundImage: "url('https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697267275258/img/202309/09142023-eu-m-polo-originals-chapter-1/0914_m_polo_originals_chapter_1_feat_c07_img.jpg')" 
    }}
  >
    <div 
      className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" 
    ></div>
    <div 
      className="bg-white p-10  shadow-lg w-1/2 space-y-5 z-10 relative"
    >
      <h3 className="text-2xl font-light uppercase">Create Product</h3>
      <div className="flex space-x-10">
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="border text-center font-light uppercase text-sm w-full p-2"
          />
          <input
            type="text"
            placeholder="image"
            onChange={(e) => setProduct({ ...product, picture: e.target.value })}
            className="border text-center font-light uppercase text-sm w-full p-2 mt-4"
          />
          <input
            type="number"
            placeholder="price"
            onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
            className="border text-center font-light uppercase text-sm w-full p-2 mt-4"
          />
          <input
            type="text"
            placeholder="description"
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="border text-center font-light uppercase text-sm w-full p-2 mt-4"
          />
          <select
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
            className="border text-center font-light uppercase text-sm w-full p-2 mt-4"
          >
            <option disabled>Choose category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              dispatch(createProduct({ product }));
              navigate("/products");
            }}
            className=" hover:text-black hover:bg-transparent hover:border text-white bg-black w-full p-2 mt-4 uppercase"
          >
            Create Product
          </button>
        </div>
        <div className="w-full h-full flex-grow">
          <img src="https://i.pinimg.com/564x/1a/74/e7/1a74e7963be67e4e9b83f1aede60d8d5.jpg" alt="Ralph Lauren" className="shadow-md w-full h-full object-cover " />
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductCreate;
