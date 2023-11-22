import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: { students: [] },
  reducers: {
    setStudent: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id === action.payload.id
      );
    },
    updateStudent: (state, action) => {
      state.students = state.students.map((student) => {
        return student.id === action.payload.id
          ? { ...student, ...action.payload }
          : student;
      });
    },
  },
});

export const { setStudent, addStudent, removeStudent, updateStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
