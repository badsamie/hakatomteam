import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productSlice";
import commentsReducer from "./comments/commentSlice";
import accountReducer from "./account/accountSlice";
import cartReducer from "./cart/cartSlice";
import favoritesReducer from "./favorites/FavoritesSlice";

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["yourIgnoredActionType"],
        ignoredPaths: ["yourIgnoredPath"],
      
      },
    }),
  reducer: {
    account: accountReducer,
    products: productsReducer,
    comments: commentsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
