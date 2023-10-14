import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortByRating } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";

const ProductsRatingSort = () => {
  const { sortByRating } = useSelector((state) => state.products);
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSortByRating({ sortByRating: sortBy }));
    dispatch(getProducts());
  }, [sortBy]);
  useEffect(() => {
    if (!sortByRating) {
      setSortBy("");
    }
  }, [sortByRating]);
  return (
    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
      <option value="">no soska</option>
      <option value="asc">из большего к мень</option>
      <option value="desc">из мень в большему</option>
    </select>
  );
};

export default ProductsRatingSort;
