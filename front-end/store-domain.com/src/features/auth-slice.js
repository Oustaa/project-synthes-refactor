import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      window.location.reload(false);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
