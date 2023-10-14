import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productsActions";
import { clearAllFilters } from "../../store/products/productSlice";
import ProductPagination from "./ProductPagination";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(clearAllFilters());
  }, []);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="flex  mt-48 flex-wrap">
          <ProductPagination />
          <div>
            {products.map((products) => (
              <ProductItem key={products.id} product={products} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
