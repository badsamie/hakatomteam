import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productsActions";

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products);

  return (
    <div className="flex  mt-48 flex-wrap">
      {products.map((products) => (
        <ProductItem key={products.id} product={products} />
      ))}
    </div>
  );
};

export default ProductList;
