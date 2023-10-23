import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    phone: null,
    email: null,
    role: "online",
  },
  reducers: {
    setRole: (state, action) => {
      state.role= action.payload;
    },
    deleteRole: (state) => {
      state.role = "online";
    },
  },
});
export const { setRole, deleteRole } = userSlice.actions;
export default userSlice.reducer;
