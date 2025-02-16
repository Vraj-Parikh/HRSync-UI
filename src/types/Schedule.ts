import {
  AddScheduleFormSchema,
  EditScheduleFormSchema,
} from "@/validation/Schedule";
import { z } from "zod";

export type TAddScheduleFormData = z.infer<typeof AddScheduleFormSchema>;
export type TEditScheduleFormData = z.infer<typeof EditScheduleFormSchema>;
