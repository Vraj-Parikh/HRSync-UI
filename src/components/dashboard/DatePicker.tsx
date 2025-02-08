// import { Calendar } from "@/components/ui/calendar";
// import AddSchedule from "./AddSchedule";
// import { useState } from "react";
// import { useAppDispatch } from "@/types/redux";
// import { setSelectedDate } from "@/redux/slice/ScheduleSlice";

// export function DatePicker() {
//   const [date, setDate] = useState<Date>(new Date());
//   const dispatch = useAppDispatch();
//   const handleDateChange = (newDate: Date | undefined) => {
//     if (!newDate || newDate === date) {
//       return;
//     }
//     setDate(newDate);
//     dispatch(setSelectedDate(newDate));
//   };
//   return (
//     <div className="">
//       {/* <Calendar
//         mode="single"
//         selected={date}
//         onSelect={handleDateChange}
//         className="rounded-md border p-6"
//       /> */}
//       <AddSchedule />
//     </div>
//   );
// }
