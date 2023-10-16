import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../store/favorites/FavoritesSlice";
import { useNavigate } from "react-router-dom";
import { deleteProductFromFavorites } from "../../store/favorites/FavoritesAction";

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
              Your Cart
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          {favorites && favorites.products && favorites.products.length ? (
            <div className="flex flex-wrap -m-4">
              {favorites.products.map((product) => (
                <div
                  key={product.productItem.id}
                  className="p-4 lg:w-1/4 md:w-1/2"
                >
                  <div className="h-full flex flex-col items-center text-center">
                    <img
                      alt="product"
                      className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                      src={product.productItem.picture}
                    />
                    <div className="w-full">
                      <h2 className="title-font font-medium text-lg text-gray-900">
                        {product.productItem.name}
                      </h2>
                      <h3 className="text-gray-500 mb-3">
                        Price: ${product.productItem.price}
                      </h3>
                      <div className="inline-flex">
                        <button
                          onClick={() => {
                            dispatch(
                              deleteProductFromFavorites(product.productItem.id)
                            );
                          }}
                          className="cart-item-remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty">
              <h3 className="cart-empty-title">Cart is empty!</h3>
              <p className="cart-empty-message">
                You should add products to the cart
              </p>
              <button
                onClick={() => navigate("/products")}
                className="cart-empty-button"
              >
                Go To Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;
