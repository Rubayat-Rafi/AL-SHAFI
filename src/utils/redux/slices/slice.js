import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activeFlag: false,
};

export const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    addActiveFlag: (state, action) => {
      state.activeFlag = action.payload;
    },
  },
});

export const {  addActiveFlag } = Slice.actions;

export default Slice.reducer;
