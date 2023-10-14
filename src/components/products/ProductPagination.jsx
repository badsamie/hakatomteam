import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductPagination = () => {
  const { currentPage, totalPages } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(changePage({ page: value }));
    dispatch(getProducts());
  };
  return (
    <div>
      <Stack
        className="pagination"
        sx={{ margin: "20px", borderRadius: "20px" }}
        spacing={2}
      >
        <Pagination
          className="paginationBody"
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "5px",
            borderRadius: "20px",
          }}
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default ProductPagination;
