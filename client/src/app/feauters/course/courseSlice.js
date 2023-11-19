import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.courses = action.payload.courses;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload.course);
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload.id
      );
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((course) =>
        course.id === action.payload.course.id
          ? { ...course, ...action.payload.course }
          : course
      );
    },
  },
});

export const { setCourse, addCourse, removeCourse, updateCourse } =
  courseSlice.actions;

export default courseSlice.reducer;
