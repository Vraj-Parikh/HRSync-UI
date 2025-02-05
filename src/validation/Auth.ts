import { z } from "zod";
import { ApiResponseSchema } from "./ApiResponse";
import {
  contactValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from "./Form";

export const AuthApiResponseSchema = ApiResponseSchema.extend({
  accessToken: z.string().nonempty(),
});
export const SignUpSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  firstName: nameValidator,
  lastName: nameValidator,
  contactNo: contactValidator,
});
export const SignInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
