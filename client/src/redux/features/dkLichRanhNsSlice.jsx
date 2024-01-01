import { createSlice } from "@reduxjs/toolkit";

export const dkLRSlice = createSlice({
  name: "dangkiLichRanh",
  initialState: {
    mans: "",
    maca: "",
    ngay: "",
  },
  reducers: {
    dangkiLichRanh: (state, action) => {
      const { mans, maca, ngay } = action.payload;
      if (mans !== undefined) {
        state.mans = mans;
      }
      if (maca !== undefined) {
        state.maca = maca;
      }
      if (ngay !== undefined) {
        state.ngay = ngay;
      }
    },
  },
});

export const { dangkiLichRanh } = dkLRSlice.actions;
export default dkLRSlice.reducer;
