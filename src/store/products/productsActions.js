import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API } from "../../helpers/consts";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await axios.get(`${PRODUCTS_API}`);
    console.log(data);
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
