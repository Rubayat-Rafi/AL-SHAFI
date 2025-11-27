import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  catFlag: false,
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addCart: (state, action) => {},
    addCatFlag: (state, action) => {
      state.catFlag = action.payload;
    },
  },
});

export const { addCart, addCatFlag } = slice.actions;

export default slice.reducer;
