import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  getCategories,
} from "../../store/products/productsActions";

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
  console.log(product);
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center h-full md:h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://www.ralphlauren.global/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/en_KG/v1697267275258/img/202309/09142023-eu-m-polo-originals-chapter-1/0914_m_polo_originals_chapter_1_feat_c07_img.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

      <div className="flex flex-col md:flex-row w-full md:w-4/5 h-full z-10 relative mt-12 md:mt-0 md:space-x-4">
        <div className="bg-white  mt-36 p-4 md:p-10 h-3/5 shadow-lg w-full md:w-1/2 space-y-4 flex flex-col justify-between">
          <h3 className="text-2xl font-light uppercase mb-4 text-center ">
            Create Product
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="border text-center font-light uppercase text-sm w-full p-2"
            />
            <input
              type="text"
              placeholder="image"
              onChange={(e) =>
                setProduct({ ...product, picture: e.target.value })
              }
              className="border text-center font-light uppercase text-sm w-full p-2"
            />
            <input
              type="number"
              placeholder="price"
              onChange={(e) =>
                setProduct({ ...product, price: parseInt(e.target.value) })
              }
              className="border text-center font-light uppercase text-sm w-full p-2"
            />
            <input
              type="text"
              placeholder="description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="border text-center font-light uppercase text-sm w-full p-2"
            />
            <select
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              className="border text-center font-light uppercase text-sm w-full p-2"
            >
              <option disabled>Choose category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              dispatch(createProduct({ product }));
              navigate("/products");
            }}
            className="hover:text-black hover:bg-transparent hover:border text-white bg-black w-full p-2 uppercase mt-4"
          >
            Create Product
          </button>
        </div>

        {/* <div className="w-full  md:w-1/2 h-4/5  md:mt-9 flex items-center">
          <img src="https://i.pinimg.com/564x/1a/74/e7/1a74e7963be67e4e9b83f1aede60d8d5.jpg" alt="Ralph Lauren" className="shadow-md w-full h-full object-cover" />
        </div> */}
      </div>
    </div>
  );
};

export default ProductCreate;
