import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slice/themeSlice";
import filterSlice from "./slice/filterSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    filter: filterSlice,
  },
});
