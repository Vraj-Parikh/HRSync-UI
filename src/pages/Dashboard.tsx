import { DatePicker } from "@/components/dashboard/DatePicker";
import { ScheduleInfo } from "@/components/dashboard/ScheduleInfo";
import { useState } from "react";
const Dashboard = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex-grow container flex justify-center py-4">
      <div className="grid md:grid-cols-2 gap-4">
        <DatePicker date={date} setDate={setDate} />
        <ScheduleInfo />
      </div>
    </div>
  );
};

export default Dashboard;
