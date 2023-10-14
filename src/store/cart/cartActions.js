import { createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_API } from "../../helpers/consts";
import axios from "axios";
//функция получает данные корзины из локального хранилища браузера. Если корзины нет, она возвращает объект с пустой корзиной.
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
//функция устанавливает данные корзины в локальном хранилище браузера. Она также добавляет информацию о пользователе, полученную из локального хранилища.
export const setCartData = (cartObj) => {
  cartObj.user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("cart", JSON.stringify(cartObj));
};
//функция проверяет, есть ли продукт с заданным идентификатором в корзине. Если продукт найден, она возвращает его; в противном случае, возвращает undefined.
export const checkProductInCart = (productId) => {
  const cart = getCartData();
  return cart.products.find((product) => product.productItem.id === productId);
};
//функция вычисляет общую стоимость продуктов в корзине. Она принимает массив продуктов и возвращает сумму их цен.
export const countCartTotalCost = (cartProducts) => {
  return cartProducts.reduce((acc, currVal) => {
    return acc + currVal.totalPrice;
  }, 0);
};

//функция добавляет или удаляет продукт из корзины в зависимости от его наличия. Если продукт уже в корзине, он будет удален; в противном случае, он будет добавлен с начальным количеством и стоимостью.
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

//функция изменяет количество определенного продукта в корзине. Она принимает идентификатор продукта и новое количество, обновляя также стоимость продукта.
export const changeCountProductInCart = (productId, count) => {
  if (count < 0) return alert("Count of product must be positive int!");
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
//функция удаляет продукт с заданным идентификатором из корзины.
export const deleteProductFromCart = (productId) => {
  const cart = getCartData();
  cart.products = cart.products.filter(
    (product) => product.productItem.id !== productId
  );
  cart.totalCost = countCartTotalCost(cart.products);
  setCartData(cart);
};

//функция очищает корзину, удаляя все данные о ней из локального хранилища браузера
export const cleanCart = () => {
  localStorage.removeItem("cart");
};

// функция возвращает количество продуктов в корзине.
export const getProductsCountInCart = () => {
  const cart = getCartData();
  return cart.products.length;
};

//функция выполняет асинхронный запрос на создание заказа, используя данные из корзины. Если корзина пуста, запрос не выполняется, и корзина очищается после успешного создания заказа.
export const createOrder = createAsyncThunk("cart/createOrder", async () => {
  const cart = getCartData();
  if (!cart.products.length) return;
  await axios.post(ORDERS_API, cart);
  cleanCart();
});
