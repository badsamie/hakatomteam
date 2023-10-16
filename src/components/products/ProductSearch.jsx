import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productsActions";
import { setSearchVal } from "../../store/products/productSlice";
const ProductSearch = () => {
  const { search } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search) {
      setSearchValue("");
    }
  }, [search]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((value) => {
    dispatch(setSearchVal({ search: value }));
    dispatch(getProducts());
  }, 300);

  const handleInputChange = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative mb-4">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        value={searchValue}
        id="Search"
        placeholder="Search"
        className=" text-black font-serif border lowercase text-md text-center  w-40 "
      />

      <span
        className="absolute inset-y-0 end-0 grid w-10 place-content-center"
        onClick={() => {
          dispatch(setSearchVal({ search: searchValue }));
          dispatch(getProducts());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </span>
    </div>
  );
};

export default ProductSearch;
