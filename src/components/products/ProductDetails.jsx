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
import LoadingIndicator from "../../pages/sabina/LoadingIndicator";

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
    <div className="container mx-auto px-4">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="flex mt-48">
          {oneProduct && (
            <>
              <div className="flex-2 pr-6 -mt-24">
                <img
                  src={oneProduct.picture}
                  alt={oneProduct.name}
                  className="w-full h-auto"
                />
              </div>


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

              <div className="flex-1 flex flex-col space-y-4">
                <h3 className="text-3xl font-light uppercase">{oneProduct.name}</h3>
                {oneProduct.rating && <h3 className="uppercase">Raiting: {oneProduct.rating}</h3>}
                <p className="text-gray-600 uppercase">{oneProduct.description}</p>
                <p className="text-lg font-light underline ">KGS {oneProduct.price}</p>


                <button
                  className="bg-transparent border е border-black w-full py-2 text-black uppercase font-light hover:bg-black hover:text-white transition duration-300"
                  onClick={() => {
                    navigate(`/product-edit/${oneProduct.id}`);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-transparent border border-black w-full py-2 text-black uppercase font-light hover:bg-black hover:text-white transition duration-300 mt-4"
                  onClick={() => {
                    dispatch(deleteProduct({ id: oneProduct.id }));
                    navigate("/products");
                  }}
                >
                  Delete
                </button>

                <button
                  className="bg-transparent border border-black w-full py-2 text-black uppercase font-light hover:bg-black hover:text-white transition duration-300 mt-4"
                  onClick={() => {
                    toggleProductToCart(oneProduct);
                    dispatch(getCart());
                  }}
                >
                  {isProductInCart ? "Remove From Cart" : "Add To Cart"}
                </button>

                {checkUserLogin() && 
                <CommentCreate product={oneProduct} />}
                {oneProduct.comments ? (
                  <div className="border mt-6 p-4 rounded">
                    <CommentList comments={oneProduct.comments} />
                  </div>
                ) : (
                  <h3 className="mt-6 text-center text-base uppercase font-light">No Comments</h3>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
