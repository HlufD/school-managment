import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: { isLogedIn: null, username: "" },
  reducers: {
    login: (state, actions) => {
      state.isLogedIn = actions.payload.isLogedIn;
      state.username = actions.payload.username;
    },
    logout: (state) => {
      state.isLogedIn = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
