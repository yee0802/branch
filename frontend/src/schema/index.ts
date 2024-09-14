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
  bio: z
    .string()
    .min(1, {
      message: "Must be 1 or more characters long",
    })
    .max(200, "Must be 200 or less characters long"),
});

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 or more characters long" })
    .max(65, { message: "Title must be 65 or less characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be 5 or more characters long" })
    .max(100, { message: "Description must be 100 or less characters long" }),
  content: z
    .string()
    .min(10, { message: "Body must be 10 or more characters long" })
    .max(5000, { message: "Body must be 5000 or less characters long" }),
});

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(200, { message: "Must be 200 or less characters long" }),
});
