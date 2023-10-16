import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getOneProduct, getProducts } from "./productsActions";
const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    oneProduct: null,
    currentPage: 1,
    totalPages: 1,
    currentCategory: "",
    search: "",
    categories: [],
    sortByRating: "",
    priceRange: "",
  },
  reducers: {
    clearOneProductState: (state) => {
      state.oneProduct = null;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload.page;
    },
    changeCategory: (state, action) => {
      if (action.payload.category === "all") {
        state.currentCategory = "";
      } else {
        state.currentCategory = action.payload.category;
      }
      state.currentPage = 1;
    },
    setSearchVal: (state, action) => {
      state.search = action.payload.search;
      state.currentPage = 1;
    },
    setSortByRating: (state, action) => {
      if (!action.payload.sortByRating) {
        state.sortByRating = "";
      } else {
        state.sortByRating = `&_sort=rating&_order=${action.payload.sortByRating}`;
      }
    },
    setPriceRangeState: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      if (minPrice && maxPrice) {
        state.priceRange = `&price_gte=${minPrice}&price_lte=${maxPrice}`;
      } else if (minPrice) {
        state.priceRange = `&price_gte=${minPrice}`;
      } else if (maxPrice) {
        state.priceRange = `&price_lte=${maxPrice}`;
      } else {
        state.priceRange = "";
      }
    },
    clearAllFilters: (state) => {
      state.currentPage = 1;
      state.currentCategory = "";
      state.search = "";
      state.sortByRating = "";
      state.priceRange = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.oneProduct = action.payload;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});
export const {
  clearOneProductState,
  changePage,
  setSearchVal,
  changeCategory,
  setSortByRating,
  setPriceRangeState,
  clearAllFilters,
} = productSlice.actions;
export default productSlice.reducer;
