import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../store/products/productsActions";

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: "",
    picture: "",
    price: 0,
    description: "",
    type: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
