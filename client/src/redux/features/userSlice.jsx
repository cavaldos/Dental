import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({ name }, { rejectWithValue }) => {
    try {
      console.log("name",name);
      const res = await axios
        .get(`http://localhost:3000/checklogin`)
        .then((res) => res.data);
      console.log(res);
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
    SODT: "",
    MANS: "",
    MANV: "",
    HOTEN: "",
    PHAI: "",
    NGAYSINH: "",
    DIACHI: "",
    VITRICV: "",
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
    updateUserInfo: (state, action) => {
      state.SODT = action.payload.SODT;
      state.MANS = action.payload.MANS;
      state.MANV = action.payload.MANV;
      state.HOTEN = action.payload.HOTEN;
      state.PHAI = action.payload.PHAI;
      state.NGAYSINH = action.payload.NGAYSINH;
      state.DIACHI = action.payload.DIACHI;
      state.VITRICV = action.payload.VITRICV;
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
        state.loading = false;
        state.status = "success";
        state.error = null;
      })
      .addCase(GetUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setRole, deleteRole, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
