import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/cart/cartSlice";
import {
  changeCountProductInCart,
  deleteProductFromCart,
  cleanCart,
  createOrder,
} from "../../store/cart/cartActions";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-4xl uppercase font-light title-font mb-4 text-gray-900">
            Your Cart
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-light uppercase">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table.
          </p>
        </div>
        {cart && cart.products && cart.products.length ? (
          <div className="flex flex-wrap -m-4">
            {cart.products.map((product) => (
              <div
                key={product.productItem.id}
                className="p-4 lg:w-1/4 md:w-1/2"
              >
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    alt="product"
                    className="flex-shrink-0 w-full h-80 object-cover object-center mb-4"
                    src={product.productItem.picture}
                  />
                  <div className="w-full">
                    <h2 className="title-font font-light uppercase text-lg text-gray-900">
                      {product.productItem.name}
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-light uppercase">
                      Price: KGS {product.productItem.price}
                    </h3>
                    <div>
                      <input
                        type="number"
                        min="1"
                        value={product.count}
                        onChange={(e) => {
                          changeCountProductInCart(
                            product.productItem.id,
                            +e.target.value
                          );
                          dispatch(getCart());
                        }}
                        style={{ fontSize: "14px" }}
                        className="cart-item-quantit border w-12 text-lg"
                      />
                      <button
                        onClick={() => {
                          deleteProductFromCart(product.productItem.id);
                          dispatch(getCart());
                        }}
                        className="cart-item-remove border font-light "
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
            <h3 className="cart-empty-title uppercase font-light">
              Cart is empty!
            </h3>
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
        <div className="cart-summary">
          {cart && cart.totalCost ? (
            <p className="cart-total uppercase font-light ">
              Total: KGS {cart.totalCost}
            </p>
          ) : null}
          <div className="cart-buttons">
            <button
              className="cart-order-button font-light border"
              onClick={() => {
                dispatch(createOrder());
                navigate("/paypage");
              }}
            >
              Order
            </button>

            <button
              className="cart-clean-button font-light border"
              onClick={() => {
                cleanCart();
                dispatch(getCart());
              }}
            >
              Clean
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
