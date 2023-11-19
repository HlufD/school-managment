import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isOpend: false, openFor: "" },
  reducers: {
    open: (state, actions) => {
      state.isOpend = true;
      state.openFor = actions.payload;
    },
    close: (state) => {
      state.isOpend = false;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
