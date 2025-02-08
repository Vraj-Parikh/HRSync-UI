import { z } from "zod";

export const emailValidator = z.string().email("Invalid Email");
export const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(30, "Password can not be more than 8 characters long");
// .regex(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/,
//   "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
// );
export const nameValidator = (fieldName = "Name") =>
  z
    .string()
    .min(2, `${fieldName} must be at least 2 characters long`)
    .regex(/^\S+$/, `${fieldName} must not contain spaces`);
export const contactValidator = z
  .string()
  .regex(
    /^\d{10}$/,
    "Contact number must be of 10 digits and contain only numbers"
  );
