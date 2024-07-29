import api from "@/api/axios";
import { PostsAxiosResponse } from "@/interfaces/PostsAxiosResponse";
import { AxiosResponse } from "axios";
import { handleError } from "./errorHandler";

export const getAllPostsAPI = async (): Promise<PostsAxiosResponse> => {
  const res: AxiosResponse<PostsAxiosResponse> = await api.get("/posts");

  return res.data;
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
