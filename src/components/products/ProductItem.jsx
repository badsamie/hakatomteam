import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div>
      <img src={product.picture} alt="" />
      <p>${product.price}</p>
      <p>{product.name}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductItem;
