import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getOneProduct,
} from "../../store/products/productsActions";
import { clearOneProductState } from "../../store/products/productSlice";
import { checkUserLogin } from "../../helpers/functions";
import {
  toggleProductToCart,
  checkProductInCart,
} from "../../store/cart/cartActions";
import { useState } from "react";
import { getCart } from "../../store/cart/cartSlice";
import CommentCreate from "../comments/CommentCreate";
import CommentList from "../comments/CommentList";
import { toggleProductToFavorites,checkProductInFavorites } from "../../store/favorites/FavoritesAction";
import { getFavorites } from "../../store/favorites/FavoritesSlice";

const ProductDetails = () => {
  const { loading, oneProduct } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
    const { favorites } = useSelector((state) => state.favorites);
  const [isProductInCart, setIsProductInCart] = useState(false);
   const [isProductInFavorites, setIsProductInFavorites] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneProduct({ id }));
    return () => dispatch(clearOneProductState());
  }, []);

  useEffect(() => {
    if (!oneProduct) return;
    if (checkProductInCart(oneProduct.id)) {
      setIsProductInCart(true);
    } else {
      setIsProductInCart(false);
    }
  }, [cart, oneProduct]);

  
  useEffect(() => {
    if (!oneProduct) return;
    if (checkProductInFavorites(oneProduct.id)) {
      setIsProductInFavorites(true);
    } else {
      setIsProductInFavorites(false);
    }
  }, [favorites, oneProduct]);

  return (
    <>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <>
          {oneProduct && (
            <div className="mt-48 w-56 h-20">
              <img src={oneProduct.picture} alt="" />
              <h3>{oneProduct.name}</h3>
              {oneProduct.rating && <h3>Raiting:{oneProduct.rating}</h3>}
              <p>{oneProduct.description}</p>
              <p>${oneProduct.price}</p>

              <button
                onClick={() => {
                  navigate(`/product-edit/${oneProduct.id}`);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  dispatch(deleteProduct({ id: oneProduct.id }));
                  navigate("/products");
                }}
              >
                delete
              </button>
              <button
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-300 focus:relative"
                onClick={() => {
                  toggleProductToCart(oneProduct);
                  dispatch(getCart());
                }}
              >
                {isProductInCart ? "Remove From Cart" : "Add To Cart"}
              </button>
              <button
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-pink-300 focus:relative"
                onClick={() => {
                  toggleProductToFavorites(oneProduct);
                  dispatch(getFavorites());
                }}
              >
                {isProductInFavorites ? "Remove From Favorites" : "Add To Favorites"}
              </button>

              <>
                {checkUserLogin() && <CommentCreate product={oneProduct} />}
                {oneProduct.comments ? (
                  <CommentList comments={oneProduct.comments} />
                ) : (
                  <h3>No soska</h3>
                )}
              </>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
