import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sideNavOpen: true,
    alertOpen: false,
  },
  reducers: {
    openAlert: (state) => {
      state.alertOpen = true;
    },
    closeAlert: (state) => {
      state.alertOpen = false;
    },
    toggleNavBar: (state) => {
      state.sideNavOpen = !state.sideNavOpen;
    },
  },
});

export const { openAlert, closeAlert, toggleNavBar } = uiSlice.actions;

export default uiSlice.reducer;
