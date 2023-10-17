import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API } from "../../helpers/consts";
import { getAuthUser, getTotalPages } from "../../helpers/functions";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { getState }) => {
    const { currentPage, currentCategory, search, sortByRating, priceRange } =
      getState().products;
    const categoryAndSearchParams = `q=${search}${
      currentCategory && `&type=${currentCategory}`
    }`;
    const pagesLimitParams = `?_page=${currentPage}&_limit=6`;
    const totalPages = await getTotalPages(
      `${PRODUCTS_API}?${categoryAndSearchParams}${priceRange}${sortByRating}`
    );
    const { data } = await axios.get(
      `${PRODUCTS_API}${pagesLimitParams}&${categoryAndSearchParams}${priceRange}${sortByRating}`
    );
    return { data, totalPages };
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ product }, { dispatch }) => {
    console.log(product);
    await axios.post(PRODUCTS_API, product);
    dispatch(getProducts());
  }
);
export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async ({ id }) => {
    const { data } = await axios.get(`${PRODUCTS_API}/${id}`);
    return data;
  }
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ product }, { dispatch }) => {
    await axios.patch(`${PRODUCTS_API}/${product.id}`, product);
    dispatch(getProducts());
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, { dispatch }) => {
    await axios.delete(`${PRODUCTS_API}/${id}`);
    dispatch(getProducts());
  }
);
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const { data } = await axios.get(PRODUCTS_API);
    const uniqueCategories = new Set(data.map((product) => product.type));
    const categories = [];
    for (let i of uniqueCategories) {
      categories.push(i);
    }
    return categories;
  }
);
export const toggleProductLike = createAsyncThunk(
  "products/toggleProductLike",
  async ({ setIsLike, likes, productId }, { dispatch }) => {
    const user = getAuthUser();
    let updatedLikesArr;
    if (!likes) {
      updatedLikesArr = [];
    } else {
      updatedLikesArr = [...likes];
    }

    if (setIsLike) {
      updatedLikesArr.push({
        id: Date.now(),
        user,
      });
    } else {
      updatedLikesArr = updatedLikesArr.filter((like) => like.user !== user);
    }
    await axios.patch(`${PRODUCTS_API}/${productId}`, {
      likes: updatedLikesArr,
    });
    dispatch(getProducts());
  }
);

export const setCardigan = (searchValue) => {
  return {
    type: "SET_CARDIGAN",
    payload: searchValue,
  };
};
