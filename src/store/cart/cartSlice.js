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
// {
//     user: 'Jack',
//     totalCost: 1740,
//     products: [
//         {
//             count: 1,
//             totalPrice: 580,
//             productItem: {
//                 "name": "iPhone 11",
//                 "description": "12-Мп ",
//                 "price": 580,
//                 "picture": "-",
//                 "type": "electronics",
//                 "id": 9
//               }
//         },
//     ]
// }
