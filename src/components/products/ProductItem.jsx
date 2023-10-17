import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin, getAuthUser } from "../../helpers/functions";
import ProductLike from "./ProductLike";
import Favorites from "../favorites/Favorites";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getFavorites } from "../../store/favorites/FavoritesSlice";
import ProductFavorites from "../favorites/ProductFavorites";

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
    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col mb-9 px-0.5">
      <div
        onClick={() => navigate(`/products/${product.id}`)}
        className="w-full h-auto overflow-hidden relative cursor-pointer"
      >
        <img
          src={product.picture}
          alt=""
          className="w-full h-full transition-transform duration-200 transform hover:scale-105"
        />
      </div>

      <div className="flex justify-between items-start mt-5 w-full">
        <div>
          <p className="font-serif text-lg">{product.name}</p>
          <p className="font-light text-sm">{product.description}</p>
          <p className="font-light text-base mt-2">KGS {product.price}</p>
        </div>

        <div className="ml-5 mr-2 flex items-center flex-col">
          {checkUserLogin() ? (
            <ProductLike
              isLikedProduct={isLikedProduct}
              likes={product.likes}
              productId={product.id}
            />
          ) : (
            <ProductLike />
          )}
          {product.likes ? (
            <span className="text-sm ml-0.5">{product.likes.length}</span>
          ) : (
            <span className="text-sm ml-0.5">0</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
