import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
  },
  reducers: {
    setDepartment: (state, action) => {
      state.departments = action.payload.departments;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload.department);
    },
    updateDepartment: (state, action) => {
      state.departments = state.departments.map((department) =>
        department.id === action.payload.department.id
          ? { ...department, ...action.payload.department }
          : department
      );
    },
    removeDepaetment: (state, action) => {
      state.departments = state.departments.filter(
        (department) => department.id !== action.payload.id
      );
    },
  },
});

export const {
  setDepartment,
  addDepartment,
  updateDepartment,
  removeDepaetment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
