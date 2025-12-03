import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activeFlag: false,
  cartFlag: false,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    addActiveFlag: (state, action) => {
      state.activeFlag = action.payload;
    },
    addCartFlag: (state, action) => {
      state.cartFlag = action.payload;
    },
  },
});

export const { addActiveFlag,addCartFlag } = Slice.actions;

export default Slice.reducer;
