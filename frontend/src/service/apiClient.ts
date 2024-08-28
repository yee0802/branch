import api from "@/api/axios";
import { PostsAxiosResponse } from "@/interfaces/PostsAxiosResponse";
import { AxiosResponse } from "axios";
import { handleError } from "./errorHandler";
import { PostAxiosResponse } from "@/interfaces/PostAxiosResponse";
import UserAxiosResponse from "@/interfaces/UserAxiosResponse";
import { CreatePostSchema, EditProfileSchema } from "@/schema";
import slugify from "slugify";

export const getAllPostsAPI = async (): Promise<PostsAxiosResponse> => {
  const res: AxiosResponse<PostsAxiosResponse> = await api.get("/posts");

  return res.data;
};

export const getPostBySlugAPI = async (
  slug: string,
): Promise<PostAxiosResponse> => {
  const res: AxiosResponse<PostAxiosResponse> = await api.get(`/posts/${slug}`);

  return res.data;
};

export const getUserByUsernameAPI = async (username: string) => {
  const res: AxiosResponse<UserAxiosResponse> = await api.get(
    `/user/${username}`,
  );

  return res.data;
};

export const updateUserProfileByIdAPI = async ({
  id,
  data,
}: {
  id: string;
  data: unknown;
}) => {
  try {
    const validatedData = EditProfileSchema.parse(data);

    const res = await api.patch(`/user/${id}/profile`, validatedData);

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const createPostAPI = async ({
  authorId,
  data,
}: {
  authorId: string;
  data: unknown;
}) => {
  try {
    const validatedData = CreatePostSchema.parse(data);

    const slug: string = slugify(validatedData.title, {
      lower: true,
      strict: true,
    });

    const createPostData = { authorId, slug, ...validatedData };

    const res = await api.post(`/posts/create-post`, createPostData);

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const registerAPI = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    const data = await api.post("/user/register", {
      email,
      username,
      password,
    });

    return data;
  } catch (err) {
    handleError(err);
  }
};

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await api.post("/user/login", { email, password });

    return data;
  } catch (err) {
    handleError(err);
  }
};
