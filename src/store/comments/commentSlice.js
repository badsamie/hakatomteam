import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {},
});
export default commentSlice.reducer;
