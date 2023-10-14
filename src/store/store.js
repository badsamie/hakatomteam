import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/accountSlice";
import productsReducer from "./products/productSlice";
import commentsReducer from "./comments/commentSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    account: accountReducer,
    products: productsReducer,
    comments: commentsReducer,
  },
});
