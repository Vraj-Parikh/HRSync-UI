import { RootState } from "@/types/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: new Date().toISOString().split("T")[0],
};
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSelectedDate: {
      reducer: (state, action: PayloadAction<string>) => {
        state.selectedDate = action.payload;
      },
      prepare: (selectedDate: Date) => {
        return { payload: selectedDate.toISOString().split("T")[0] };
      },
    },
  },
});

export const getSelectedDate = (state: RootState) =>
  state.schedule.selectedDate;

export const { setSelectedDate } = scheduleSlice.actions;
export default scheduleSlice.reducer;
