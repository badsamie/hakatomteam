import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRangeState } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";

const ProductsPriceRangeFilter = () => {
  const { priceRange } = useSelector((state) => state.products);
  const [priceRangeVal, setPriceRangeVal] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!priceRange) {
      setPriceRangeVal({
        minPrice: "",
        maxPrice: "",
      });
    }
  }, [priceRange]);
  return (
    <div>
      <input
        type="number"
        placeholder="min"
        onChange={(e) =>
          setPriceRangeVal({ ...priceRangeVal, minPrice: +e.target.value })
        }
        value={priceRangeVal.minPrice}
      />
      <span>-----------</span>
      <input
        type="number"
        placeholder="max"
        onChange={(e) =>
          setPriceRangeVal({ ...priceRangeVal, maxPrice: +e.target.value })
        }
        value={priceRangeVal.maxPrice}
      />
      <button
        onClick={() => {
          dispatch(setPriceRangeState(priceRangeVal));
          dispatch(getProducts());
        }}
      >
        check
      </button>
    </div>
  );
};

export default ProductsPriceRangeFilter;
