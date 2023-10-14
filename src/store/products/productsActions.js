import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API } from "../../helpers/consts";
import { getAuthUser } from "../../helpers/functions";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { getState }) => {
    const { data } = await axios.get(`${PRODUCTS_API}`);
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ product }, { dispatch }) => {
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
  "product/toggleProductLike",
  async ({ setIslike, likes, productId }, { dispatch }) => {
    const user = getAuthUser();
    let updatedLikesArr;
    if (!likes) {
      updatedLikesArr = [];
    } else {
      updatedLikesArr = [...likes];
    }
    if (setIslike) {
      updatedLikesArr = [...likes];
    }
    if (setIslike) {
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
