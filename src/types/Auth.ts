import {
  AuthApiResponseSchema,
  SignInSchema,
  SignUpSchema,
} from "@/validation/Auth";
import { z } from "zod";

export type TSignInFormData = z.infer<typeof SignInSchema>;
export type TSignUpFormData = z.infer<typeof SignUpSchema>;
export type TAuthApiResponseData = z.infer<typeof AuthApiResponseSchema>;
