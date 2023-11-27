import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feauters/user/userSlice";
import modalSlice from "./feauters/modal/modalSlice";
import courseSlice from "./feauters/course/courseSlice";
import departmentSlice from "./feauters/department/departmentSlice";
import otheStateSlice from "./feauters/other/otherSlice";
import studentSlice from "./feauters/student/studentSlice";
import studentCourseSlice from "./feauters/student_course/studentCourseSlice";
export const store = configureStore({
  reducer: {
    User: userSlice,
    Modal: modalSlice,
    Course: courseSlice,
    Department: departmentSlice,
    OthersStates: otheStateSlice,
    Student: studentSlice,
    studentCourse: studentCourseSlice,
  },
});
