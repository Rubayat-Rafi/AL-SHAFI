import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  activeFlag: false,
  cartFlag: false,
  orderBulkIds: [],
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
    addBulkOrders: (state, action) => {
      if (!state.orderBulkIds.includes(action.payload)) {
        state.orderBulkIds.push(action.payload);
      }
    },
    removeBulkOrders: (state, action) => {
      state.orderBulkIds = state.orderBulkIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addActiveFlag, addCartFlag, addBulkOrders, removeBulkOrders } =
  Slice.actions;

export default Slice.reducer;
