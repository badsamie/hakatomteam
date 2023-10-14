import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, getAuthUser } from "../../helpers/functions";
import ProductLike from "./ProductLike";

const ProductItem = ({ product }) => {
  const [isLikedProduct, setIsLikedProduct] = useState(false);
  const navigate = useNavigate();

  const checkProductLike = () => {
    const user = getAuthUser();
    if (!product.likes) return;
    const userLike = product.likes.find((like) => like.user === user);
    if (userLike) {
      setIsLikedProduct(true);
    } else {
      setIsLikedProduct(false);
    }
  };
  useEffect(() => {
    checkProductLike();
  }, []);

  return (
    <>
      <div className="w-72 h-64 bg-slate-500">
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          src={product.picture}
          alt=""
        />
        <p>${product.price}</p>
        <p>{product.name}</p>
        <p>{product.description}</p>
      </div>
      <div>
        {checkUserLogin() && (
          <ProductLike
            isLikedProduct={isLikedProduct}
            likes={product.likes}
            productId={product.id}
          />
        )}
        {product.likes ? (
          <span className="text-xl">{product.likes.length}</span>
        ) : (
          <span className="text-xl">0</span>
        )}
      </div>
    </>
  );
};

export default ProductItem;
