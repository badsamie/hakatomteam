import React from "react";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { toggleProductLike } from "../../store/products/productsActions";

const ProductLike = ({ isLikedProduct, likes, productId }) => {
  const dispatch = useDispatch();

  const handleClick = (isLike) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Like button clicked. Is like:", isLike);

    dispatch(toggleProductLike({ setIsLike: isLike, likes, productId }));
  };

  return (
    <>
      {isLikedProduct ? (
        <div onClick={handleClick(false)}>
          <FavoriteIcon className="filled-outlined-heart" />
        </div>
      ) : (
        <div onClick={handleClick(true)}>
          <FavoriteBorderOutlined color="action" />
        </div>
      )}
    </>
  );
};
export default ProductLike;
