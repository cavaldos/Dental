import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const GetUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get("/user/getUserInfo");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    ROLE: "online",
    SDT: "",
    HOTEN: "",
    PHAI: "",
    NGAYSINH: "",
    DIACHI: "",
  },
  reducers: {
    setRole: (state, action) => {
      state.ROLE= action.payload;
    },
    deleteRole: (state) => {
      state.ROLE = "online";
    },
  },
});
export const { setRole, deleteRole } = userSlice.actions;
export default userSlice.reducer;
