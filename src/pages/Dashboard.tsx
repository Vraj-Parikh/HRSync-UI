import AddScheduleForm from "@/components/dashboard/AddScheduleForm";
import { DatePicker } from "@/components/dashboard/DatePicker";
import { ScheduleInfo } from "@/components/dashboard/ScheduleInfo";
import { generateRequestHeader } from "@/helpers/RequestHeader";
import { ApiResponseSchema } from "@/validation/ApiResponse";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

const TimeSlotApiResponseSchema = ApiResponseSchema.extend({
  timeSlots: z.array(
    z.object({
      time_slot_id: z.string().nonempty(),
      start_time: z.string().nonempty(),
      end_time: z.string().nonempty(),
    })
  ),
});
export type TimeSlotResponseAPI = z.infer<typeof TimeSlotApiResponseSchema>;
async function fetchSchedule() {
  try {
    const endpoint = "http://localhost:8000/api/time-slot";
    const token = localStorage.getItem("token");
    if (!token) {
      return [];
    }
    const response = await axios.get<TimeSlotResponseAPI>(endpoint, {
      headers: {
        ...generateRequestHeader(token),
      },
    });
    const val = TimeSlotApiResponseSchema.parse(response.data);
    return val.timeSlots;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const Dashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlotResponseAPI["timeSlots"]>(
    []
  );
  useEffect(() => {
    fetchSchedule().then((resp) => setTimeSlots(resp));
  }, [date]);
  return (
    <div className="flex-grow container flex justify-center py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {/* <Button>Add Schedule</Button> */}
          <DatePicker date={date} setDate={setDate} />
          <AddScheduleForm
            // selectionOptions={[{ title: "test", value: "test" }]}
            selectionOptions={timeSlots.map(
              ({ time_slot_id, start_time, end_time }) => ({
                title: start_time + "-" + end_time,
                value: time_slot_id,
              })
            )}
          />
        </div>
        <ScheduleInfo />
      </div>
    </div>
  );
};

export default Dashboard;
