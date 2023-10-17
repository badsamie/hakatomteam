import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../store/products/productSlice";
import { getProducts } from "../../store/products/productsActions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductPagination = () => {
  const { currentPage, totalPages } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    dispatch(changePage({ page: value }));
    dispatch(getProducts());
  };
  return (
    <Stack
      className="pagination"
      sx={{
        margin: "20px",
        width: { xs: "100%", md: "25%" },
        justifyContent: { xs: "center", md: "flex-start" }
      }}
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
  );
};

export default ProductPagination;
