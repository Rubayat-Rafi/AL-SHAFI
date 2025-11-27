import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  carts: [],

};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addCart: (state, action) => {

    },

  },
});

export const {
  addCart,

} = slice.actions;

export default slice.reducer;
