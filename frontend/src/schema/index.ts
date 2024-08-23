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

export const EditProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Must be 1 or more characters long",
    })
    .max(15, {
      message: "Must be 15 or less characters long ",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Must be 1 or more characters long",
    })
    .max(15, {
      message: "Must be 15 or less characters long ",
    }),
});
