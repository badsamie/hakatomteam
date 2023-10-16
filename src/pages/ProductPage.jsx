import React, { Suspense } from "react";
import FilterProducts from "./FilterProducts";
import LoadingIndicator from "./sabina/LoadingIndicator";
import Slider from "./sabina/Slider";


const LazyProductList = React.lazy(() =>
  import("../components/products/ProductList")
);

const ProductPage = () => {
  return (
    <>
      <FilterProducts />
      <Suspense
        fallback={
          <div>
            {" "}
            <LoadingIndicator />
          </div>
        }
      >
        <LazyProductList />
      </Suspense>
    </>
  );
};

export default ProductPage;
