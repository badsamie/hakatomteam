import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-72 h-64 bg-slate-500"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.picture} alt="" />
      <p>${product.price}</p>
      <p>{product.name}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductItem;
