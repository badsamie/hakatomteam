import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productsActions";
import { get } from "react-scroll/modules/mixins/scroller";
const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default productSlice.reducer;
