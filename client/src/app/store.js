import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feauters/user/userSlice";
import modalSlice from "./feauters/modal/modalSlice";
import courseSlice from "./feauters/course/courseSlice";
export const store = configureStore({
  reducer: { User: userSlice, Modal: modalSlice, Course: courseSlice },
});
