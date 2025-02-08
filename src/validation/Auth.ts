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
  firstName: nameValidator("First Name"),
  lastName: nameValidator("Last Name"),
  contactNum: contactValidator,
});
export const SignInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
