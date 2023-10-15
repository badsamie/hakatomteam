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

  return (
    <div>
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        onChange={(e) => {
          setSearchValue(e.target.value);
          dispatch(setSearchVal({ search: e.target.value }));
          dispatch(getProducts());
        }}
        value={searchValue}
        id="Search"
        placeholder="Поиск...."
      />
      <span>
        <button
          onClick={() => {
            dispatch(setSearchVal({ search: searchValue }));
            dispatch(getProducts());
          }}
        >
          Search
        </button>
      </span>
    </div>
  );
};

export default ProductSearch;
