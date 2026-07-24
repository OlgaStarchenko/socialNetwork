import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTag: "",
  selectedSort: "1",
  page: 1,
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeActiveTag: (state, action) => {
      state.activeTag = action.payload;
      state.page = 1;
    },
    changeSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
      state.page = 1;
    },
    clearAllFilters: (state) => {
      state.activeTag = "";
      state.selectedSort = "1";
      state.page = 1;
      state.search = "";
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
  },
});

export default filterSlice.reducer;
export const {
  changeActiveTag,
  changeSelectedSort,
  clearAllFilters,
  changePage,
  changeSearch,
} = filterSlice.actions;
