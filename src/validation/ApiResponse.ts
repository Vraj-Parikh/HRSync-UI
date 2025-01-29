import { z } from "zod";

export const ApiResponseSchema = z.object({
  isAuthenticated: z.boolean(),
  success: z.boolean(),
  msg: z.string(),
});
