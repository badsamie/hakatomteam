import React from "react";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toggleProductLike } from "../../store/products/productsActions";

const ProductLike = ({ isLikedProduct, likes, productId }) => {
  const dispatch = useDispatch();
  return (
    <>
      {isLikedProduct ? (
        <div
          onClick={() =>
            dispatch(toggleProductLike({ setIsLike: false, likes, productId }))
          }
        >
          <FavoriteIcon fontSize="large" color="error" />
        </div>
      ) : (
        <div
          onClick={() =>
            dispatch(toggleProductLike({ setIsLike: true, likes, productId }))
          }
        >
          <FavoriteIcon fontSize="large" color="primary" />
        </div>
      )}
    </>
  );
};

export default ProductLike;
