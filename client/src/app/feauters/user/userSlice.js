import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: { isLogedIn: false, username: "" },
  reducers: {
    login: (state, actions) => {
      state.isLogedIn = true;
      state.username = actions.payload.username;
    },
    logout: (state) => {
      state.isLogedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
