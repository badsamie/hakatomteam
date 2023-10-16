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
    <div className="flex">
    <h4 className="uppercase font-serif text-sm mt-3 mb-3 ">sort by:</h4>
     <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="ml-16">
      <option value="" className="text-center">no sort</option>
      <option value="asc">⬆ ⇾ ⇩</option>
      <option value="desc">⇩ ⇽ ⬆</option>
    </select>
    </div>
   
  );
};

export default ProductsRatingSort;
