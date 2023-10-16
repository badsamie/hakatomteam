import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getProducts,
} from "../../store/products/productsActions";
import { changeCategory } from "../../store/products/productSlice";

const ProductFilter = () => {
  const { categories, currentCategory } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("all");
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
      setCategory("all");
    }
  }, [currentCategory]);

  return (
    <div>
      <h4 className="font-serif mt-3 uppercase text-sm mb-3">categories</h4>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="all">all</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
