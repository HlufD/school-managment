import { createSlice } from "@reduxjs/toolkit";

const student_courseSlice = createSlice({
  name: "student-coures",
  initialState: { student_courses: [] },
  reducers: {
    setStudent_Course: (state, action) => {
      state.student_courses = action.payload;
    },
    addCourse: (state, action) => {
      state.student_courses.push(action.payload);
    },
    editStudentCourse: (state, action) => {
      console.log(action.payload);
      state.student_courses = state.student_courses.map((coures) => {
        return coures.id === action.payload.id
          ? { ...coures, ...action.payload }
          : coures;
      });
    },
    removeStudentCourse: (state, action) => {
      state.student_courses = state.student_courses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const {
  setStudent_Course,
  addCourse,
  editStudentCourse,
  removeStudentCourse,
} = student_courseSlice.actions;

export default student_courseSlice.reducer;
