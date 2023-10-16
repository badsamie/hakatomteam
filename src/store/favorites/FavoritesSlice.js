import { createSlice } from "@reduxjs/toolkit";
import { getFavoritesData } from "./FavoritesAction";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: null,
    countProductsInCart: 0,
  },
  reducers: {
    getFavorites: (state) => {
      state.favorites = getFavoritesData();
    },
  },
 });

export const { getFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
