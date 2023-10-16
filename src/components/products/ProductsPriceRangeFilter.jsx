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
    <>
    <h4 className=" font-serif mb-2 uppercase text-sm">price</h4>
    <div className="flex">
     
      <input
        type="number"
        placeholder="min"
        onChange={(e) =>
          setPriceRangeVal({ ...priceRangeVal, minPrice: +e.target.value })
        }
        value={priceRangeVal.minPrice}
        className="text-center border w-16 font-serif h-7"
      />
      <span>-</span>
      <input
        type="number"
        placeholder="max"
        onChange={(e) =>
          setPriceRangeVal({ ...priceRangeVal, maxPrice: +e.target.value })
        }
        value={priceRangeVal.maxPrice}
        className="w-16 border text-center font-serif h-7"
      />
      <button
        onClick={() => {
          dispatch(setPriceRangeState(priceRangeVal));
          dispatch(getProducts());
        }}
        className="border h-7 w-36 font-serif text-sm ml-3"
      >
        check
      </button>
    </div>
    </>
  );
};

export default ProductsPriceRangeFilter;
