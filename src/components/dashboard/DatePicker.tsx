import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

type DatePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};
export function DatePicker({ date, setDate }: DatePickerProps) {
  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate || newDate === date) {
      return;
    }
    setDate(newDate);
  };
  return (
    <div className="">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        className="rounded-md border"
      />
    </div>
  );
}
