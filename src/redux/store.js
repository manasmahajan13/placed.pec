import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
