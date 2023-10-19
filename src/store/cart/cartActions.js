import { createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_API } from "../../helpers/consts";
import axios from "axios";

export const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart)
    return {
      user: "",
      totalCost: 0,
      products: [],
    };
  return cart;
};

export const setCartData = (cartObj) => {
  cartObj.user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("cart", JSON.stringify(cartObj));
};

export const checkProductInCart = (productId) => {
  const cart = getCartData();
  return cart.products.find((product) => product.productItem.id === productId);
};

export const countCartTotalCost = (cartProducts) => {
  return cartProducts.reduce((acc, currVal) => {
    return acc + currVal.totalPrice;
  }, 0);
};

export const toggleProductToCart = (productObj) => {
  const cart = getCartData();
  if (!checkProductInCart(productObj.id)) {
    cart.products.push({
      count: 1,
      totalPrice: +productObj.price,
      productItem: productObj,
    });
  } else {
    cart.products = cart.products.filter(
      (product) => product.productItem.id !== productObj.id
    );
  }
  cart.totalCost = countCartTotalCost(cart.products);
  setCartData(cart);
};

export const changeCountProductInCart = (productId, count) => {
  //
  if (count < 0) return alert("Должна быть больше!");
  const cart = getCartData();
  cart.products = cart.products.map((product) => {
    if (product.productItem.id === productId) {
      product.count = count;
      product.totalPrice = product.productItem.price * count;
    }
    return product;
  });
  cart.totalCost = countCartTotalCost(cart.products);
  setCartData(cart);
};
export const deleteProductFromCart = (productId) => {
  const cart = getCartData();
  cart.products = cart.products.filter(
    (product) => product.productItem.id !== productId
  );
  cart.totalCost = countCartTotalCost(cart.products);
  setCartData(cart);
};

export const cleanCart = () => {
  //
  localStorage.removeItem("cart");
};

export const getProductsCountInCart = () => {
  //
  const cart = getCartData();
  return cart.products.length;
};

export const createOrder = createAsyncThunk("cart/createOrder", async () => {
  ///
  const cart = getCartData();
  if (!cart.products.length) return;
  await axios.post(ORDERS_API, cart);
  cleanCart();
});
