import React, { useState } from "react";
import { clearAllFilters } from "../store/products/productSlice";
import { getProducts } from "../store/products/productsActions";
import ProductSearch from "../components/products/ProductSearch";
import ProductsPriceRangeFilter from "../components/products/ProductsPriceRangeFilter";
import ProductsRatingSort from "../components/products/ProductsRatingSort";
import ProductFilter from "../components/products/ProductFilter";
import { useDispatch } from "react-redux";

const FilterProducts = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="mt-12 relative">
      <button
        onClick={() => setSidebarVisible(!isSidebarVisible)}
        className="border text-black font-light uppercase w-48 h-9 hover:text-white hover:bg-black"
      >
        filter & sort
      </button>

      {isSidebarVisible && 
        <div 
        className="fixed inset-0 bg-black opacity-50 z-20"
        onClick={() => setSidebarVisible(false)}
        ></div>
      }
      
      <div 
        className={`fixed top-48 right-0 w-full md:w-1/6 bg-white p-5 transition-transform duration-500 ease-in-out transform ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'} z-30`}
      >
        <h1 className="text-black font-serif text-center uppercase mb-5 text-lg">
          Filter & sort
        </h1>
        <ProductSearch />
        <ProductsRatingSort />
        <ProductsPriceRangeFilter />
        <ProductFilter />

        <button
          className="text-black border hover:text-white hover:bg-black uppercase h-8 w-48 text-sm font-light mt-5 "
          onClick={() => {
            dispatch(clearAllFilters());
            dispatch(getProducts());
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default FilterProducts;
