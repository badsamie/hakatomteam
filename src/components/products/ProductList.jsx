import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productsActions";
import { clearAllFilters } from "../../store/products/productSlice";
import ProductPagination from "./ProductPagination";
import ProductItem from "./ProductItem";

import LoadingIndicator from "../../pages/sabina/LoadingIndicator";

const ProductList = () => {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(clearAllFilters());
  }, []);

  return (
    <div
      className="flex-block align-center"
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ProductPagination />
          <div className="flex flex-wrap justify-between">
            {products.map((products) => (
              <ProductItem key={products.id} product={products} />
            ))}
          </div>
          <ProductPagination />
        </>
      )}
    </div>
  );
};

export default ProductList;
