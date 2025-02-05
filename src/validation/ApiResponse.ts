import { z } from "zod";

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  msg: z.string(),
});
