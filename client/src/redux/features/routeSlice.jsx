import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
  name: "route",
  initialState: {
    route: "online",
  },
  reducers: {
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    deleteRoute: (state) => {
      state.route = "online";
    },
  },
});
export const { setRoute, deleteRoute } = routeSlice.actions;
export default routeSlice.reducer;
