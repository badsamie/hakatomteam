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
  return (
    <div className="mt-32 bg-yellow-200">
      <h3>Create Product</h3>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="image"
        onChange={(e) => setProduct({ ...product, picture: e.target.value })}
      />
      <input
        type="number"
        placeholder="price"
        onChange={(e) =>
          setProduct({ ...product, price: parseInt(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <select
        onChange={(e) => setProduct({ ...product, type: e.target.value })}
      >
        <option disabled>chose category</option>
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
      >
        createProduct
      </button>
    </div>
  );
};

export default ProductCreate;
