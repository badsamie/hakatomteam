import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productSlice";
import commentsReducer from "./comments/commentSlice";
import accountReducer from "./account/accountSlice";
import cartReducer from "./cart/cartSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    account: accountReducer,
    products: productsReducer,
    comments: commentsReducer,
    cart: cartReducer,
  },
});
