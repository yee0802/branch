import api from "@/api/axios";
import { PostsAxiosResponse } from "@/interfaces/PostsAxiosResponse";
import { AxiosResponse } from "axios";

export const getAllPostsAPI = async (): Promise<PostsAxiosResponse> => {
  const res: AxiosResponse<PostsAxiosResponse> = await api.get("/posts");

  return res.data;
};
