import { createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTS_API } from "../../helpers/consts";
import { getProductRating } from "../../helpers/functions";
import { getOneProduct } from "../products/productsActions";
import axios from "axios";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ productObj, commentObj }, { dispatch }) => {
    const updatedProductObj = {
      ...productObj,
    };
    const checkCommentKeyInProduct =
      Object.keys(updatedProductObj).includes("comments");
    if (!checkCommentKeyInProduct) {
      updatedProductObj.comments = [commentObj];
    } else {
      updatedProductObj.comments = [...productObj.comments, commentObj];
    }
    updatedProductObj.rating = getProductRating(updatedProductObj);
    await axios.patch(
      `${PRODUCTS_API}/${updatedProductObj.id}`,
      updatedProductObj
    );
    dispatch(getOneProduct({ id: updatedProductObj.id }));
  }
);
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ commentId }, { dispatch, getState }) => {
    const { oneProduct } = getState().products;
    const updatedProduct = { ...oneProduct };
    updatedProduct.comments = updatedProduct.comments.filter(
      (comment) => comment.id !== commentId
    );
    updatedProduct.rating = getProductRating(updatedProduct);

    await axios.patch(`${PRODUCTS_API}/${updatedProduct.id}`, updatedProduct);
    dispatch(getOneProduct({ id: updatedProduct.id }));
  }
);
