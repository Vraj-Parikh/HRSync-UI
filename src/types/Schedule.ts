import { ScheduleFormSchema } from "@/validation/Schedule";
import { z } from "zod";

export type ScheduleFormData = z.infer<typeof ScheduleFormSchema>;
