import { configureStore } from "@reduxjs/toolkit";
import slice from "../features/main/slice";
let store = configureStore({
  reducer: {
    slice,
  },
});
export default store;
