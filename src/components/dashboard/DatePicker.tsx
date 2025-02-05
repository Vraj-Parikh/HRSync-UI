import { Calendar } from "@/components/ui/calendar";
import AddSchedule from "./AddSchedule";

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
    <div className="w-fit mx-auto space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        className="rounded-md border p-6"
      />
      <AddSchedule />
    </div>
  );
}
