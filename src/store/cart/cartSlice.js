import { createSlice } from "@reduxjs/toolkit";
import {
  getCartData,
  createOrder,
  getProductsCountInCart,
} from "./cartActions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    countProductsInCart: 0,
  },
  reducers: {
    getCart: (state) => {
      state.cart = getCartData();
      state.countProductsInCart = getProductsCountInCart();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.cart = getCartData();
      state.countProductsInCart = 0;
    });
  },
});

export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
