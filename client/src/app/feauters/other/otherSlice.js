import { createSlice } from "@reduxjs/toolkit";

const otheStateSlice = createSlice({
  name: "others",
  initialState: {
    types: [],
    levels: [],
    school_years: [],
  },
  reducers: {
    // Types -> is completed
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    addTypes: (state, action) => {
      state.types.push(action.payload);
    },
    removeTypes: (state, action) => {
      state.types = state.types.filter((type) => type.id !== action.payload.id);
    },
    updateTypes: (state, action) => {
      state.types = state.types.map((type) =>
        type.id == action.payload.id ? { ...type, ...action.payload } : type
      );
    },

    //levels -> is completed
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
    addLevels: (state, action) => {
      state.levels.push(action.payload);
    },
    removeLevel: (state, action) => {
      state.levels = state.levels.filter(
        (level) => level.id !== action.payload.id
      );
    },
    updateLvel: (state, action) => {
      state.levels = state.levels.map((level) => {
        return level.id == action.payload.id
          ? { ...level, ...action.payload }
          : level;
      });
    },
    // school_year - is completed
    setSchool_Year: (state, action) => {
      state.school_years = action.payload.school_years;
    },
    addSchool_year: (state, action) => {
      state.school_years.push(action.payload.school_year);
    },
    removeScool_yeas: (state, action) => {
      state.school_years = state.school_years.filter(
        (school_year) => school_year.id !== action.payload.id
      );
    },
    updateSchool_Year: (state, action) => {
      state.school_years = state.school_years.map((school_year) => {
        return school_year.id == action.payload.id
          ? { ...school_year, ...action.payload }
          : school_year;
      });
    },
  },
});

export const {
  setTypes,
  addTypes,
  removeTypes,
  updateTypes,
  setLevels,
  addLevels,
  removeLevel,
  updateLvel,
  setSchool_Year,
  removeScool_yeas,
  addSchool_year,
  updateSchool_Year,
} = otheStateSlice.actions;
export default otheStateSlice.reducer;
