import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getProducts,
} from "../../store/products/productsActions";
import { changeCategory } from "../../store/products/productSlice";

const Category = () => {
  const { categories, currentCategory } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("cardigan");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [category]);
  useEffect(() => {
    dispatch(changeCategory({ category }));
    dispatch(getProducts());
  }, [category]);
  useEffect(() => {
    if (!currentCategory) {
      setCategory;
    }
  });
  return <div></div>;
};

export default Category;
