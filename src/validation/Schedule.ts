import { z } from "zod";
import { contactValidator, nameValidator } from "./Form";
import { InterviewStatusConst } from "@/config/constants";

export const AddScheduleFormSchema = z.object({
  startDateTime: z.date({ message: "Please Select Time Slot" }),
  endDateTime: z.date({ message: "Please Select Time Slot" }),
  candidateFirstName: nameValidator("First Name"),
  candidateLastName: nameValidator("Last Name"),
  candidateEmail: z
    .string()
    .refine((email) => !email || z.string().email().safeParse(email).success, {
      message: "Invalid email format",
    }),
  candidateContactNum: z
    .string()
    .refine(
      (contactNo) =>
        !contactNo || contactValidator.safeParse(contactNo).success,
      {
        message:
          contactValidator._def.checks?.[0]?.message ||
          "Invalid Contact Number",
      }
    ),
});

export const EditScheduleFormSchema = AddScheduleFormSchema.extend({
  interviewStatus: z.enum(InterviewStatusConst),
});
