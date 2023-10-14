import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./account/accountSlice";
import productsReducer from "./products/productSlice";
import cartReducer from "./cart/cartSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    account: accountReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
