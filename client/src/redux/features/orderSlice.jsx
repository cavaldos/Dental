import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    sodt: "",
    mans: "",
    sott: "",
    lydokham: "",
    CA: {
      NGAY: "",
      MACA: "",
      GIOBATDAU: "",
      GIOKETTHUC: "",
    },
  },
  reducers: {
    booking: (state, action) => {
      console.log(action.payload);
      const { sodt, mans, sott, lydokham, MACA, NGAY, GIOBATDAU, GIOKETTHUC } =
        action.payload;
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
      if (MACA !== undefined) {
        state.CA.MACA = MACA;
      }
      if (NGAY !== undefined) {
        state.CA.NGAY = NGAY;
      }
      if (GIOBATDAU !== undefined) {
        state.CA.GIOBATDAU = GIOBATDAU;
      }
      if (GIOKETTHUC !== undefined) {
        state.CA.GIOKETTHUC = GIOKETTHUC;
      }
    },
  },
});

export const { booking } = orderSlice.actions;
export default orderSlice.reducer;
