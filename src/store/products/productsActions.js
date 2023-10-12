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
