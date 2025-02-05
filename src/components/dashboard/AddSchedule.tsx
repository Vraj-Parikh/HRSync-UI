import { useToast } from "@/hooks/use-toast";
import { contactValidator, nameValidator } from "@/validation/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddScheduleForm from "./AddScheduleForm";
import { Container } from "rsuite";
import { GetErrorMessage } from "@/helpers/utils";
import axios from "axios";
import { ApiResponseSchema } from "@/validation/ApiResponse";

const FormSchema = z.object({
  start_time: z.date({ message: "Please Select Time Slot" }),
  end_time: z.date({ message: "Please Select Time Slot" }),
  first_name: nameValidator,
  last_name: nameValidator,
  email: z.string().email().optional(),
  contact_no: contactValidator.optional(),
});
export type AddScheduleFormData = z.infer<typeof FormSchema>;

function checkIfTimeBeforeOrEqual(start_time: Date, end_time: Date) {
  const hours1 = start_time.getHours();
  const minutes1 = start_time.getMinutes();

  const hours2 = end_time.getHours();
  const minutes2 = end_time.getMinutes();

  let msg = "";
  if (hours1 === hours2) {
    if (minutes1 < minutes2) {
      msg = "End time could not be before start time";
    } else if (minutes1 === minutes2) {
      msg = "End time could not be same as start time";
    }
  } else if (hours1 < hours2) {
    msg = "End time could not be before start time";
  }
  return msg;
}
type AddScheduleResponseAPI = z.infer<typeof ApiResponseSchema>;
function AddSchedule() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      contact_no: "",
      first_name: "",
      last_name: "",
      start_time: new Date(),
      end_time: new Date(),
    },
  });
  const onSubmit = async (data: AddScheduleFormData) => {
    const { start_time, end_time } = data;
    let msg = checkIfTimeBeforeOrEqual(start_time, end_time);
    if (msg) {
      toast({
        title: msg,
        variant: "destructive",
      });
      return;
    }

    try {
      const endpoint = "http://localhost:8000/api/schedule/add";
      const headers = {};
      const resp = await axios.post<AddScheduleResponseAPI>(endpoint, data, {
        headers: {
          ...headers,
        },
      });
    } catch (error) {
      GetErrorMessage(error, "Could not set schedule");
    }
  };
  return (
    <>
      <Container>
        <AddScheduleForm form={form} onSubmit={onSubmit} />
      </Container>
    </>
  );
}

export default AddSchedule;
