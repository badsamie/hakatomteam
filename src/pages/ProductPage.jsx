import React from "react";
import ProductList from "../components/products/ProductList";
import { useDispatch } from "react-redux";
import { clearAllFilters } from "../store/products/productSlice";
import { getProducts } from "../store/products/productsActions";
import ProductSearch from "../components/products/ProductSearch";
import ProductsPriceRangeFilter from "../components/products/ProductsPriceRangeFilter";
import ProductsRatingSort from "../components/products/ProductsRatingSort";
import ProductFilter from "../components/products/ProductFilter";

const ProductPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="mt-28">
      <ProductSearch />
      <ProductsPriceRangeFilter />
      <ProductsRatingSort />
      <ProductFilter />

      <button
        className="text-red-600"
        onClick={() => {
          dispatch(clearAllFilters());
          dispatch(getProducts());
        }}
      >
        Clear
      </button>
      <ProductList />
    </div>
  );
};

export default ProductPage;
