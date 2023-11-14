import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feauters/user/userSlice";
export const store = configureStore({
  reducer: { User: userSlice },
});
