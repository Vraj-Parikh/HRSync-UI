import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/AuthSlice";
import ScheduleReducer from "../slice/ScheduleSlice";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    schedule: ScheduleReducer,
  },
});
