import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    sodt: "",
    mans: "",
    sott: "",
    lydokham: "",
  },
  reducers: {
    booking: (state, action) => {
     const { sodt, mans, sott, lydokham } = action.payload;
     if (sodt !== undefined) {
       state.sodt = sodt;
     }
     if (mans !== undefined) {
       state.mans = mans;
     }
     if (sott !== undefined) {
       state.sott = sott;
     }
     if (lydokham !== undefined) {
       state.lydokham = lydokham;
     }

    },
  },
});

export const { booking } = orderSlice.actions;
export default orderSlice.reducer;
