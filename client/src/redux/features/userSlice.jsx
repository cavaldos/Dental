import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({ name }, { rejectWithValue }) => {
    try {
      console.log(name);
      const res = await axios
        .get(`https://fakestoreapi.com/products`)
        .then((res) => res.data);
      // console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
    category:"",
    loading: false,
    status: "idle",
    error: null,


  },
  reducers: {
    setRole: (state, action) => {
      state.ROLE = action.payload;
    },
    deleteRole: (state) => {
      state.ROLE = "online";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserInfo.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(GetUserInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.status = "success";
        state.error = null;
        state.category = action.payload[0].category;
      })
      .addCase(GetUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setRole, deleteRole } = userSlice.actions;
export default userSlice.reducer;
