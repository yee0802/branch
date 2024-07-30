import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z.string().min(3, {
    message: "Please enter a valid username",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
