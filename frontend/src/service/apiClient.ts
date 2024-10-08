import api from "@/api/axios";
import { AxiosResponse } from "axios";
import { handleError } from "./errorHandler";
import { PostAxiosResponse } from "@/interfaces/PostAxiosResponse";
import UserAxiosResponse from "@/interfaces/UserAxiosResponse";
import { CreatePostSchema, EditProfileSchema } from "@/schema";
import slugify from "slugify";

export const getAllPostsAPI = async (cursor?: unknown) => {
  try {
    const res = await api.get("/posts", {
      params: { cursor },
    });

    return res.data;
  } catch (err) {
    handleError(err);
  }
};
export const getPostsByUserIdAPI = async (
  userId?: string,
  cursor?: unknown,
) => {
  try {
    const res = await api.get(`/posts/author/${userId}`, {
      params: { cursor },
    });

    return res.data;
  } catch (err) {
    handleError(err);
  }
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
  avatar,
}: {
  id: string;
  data: unknown;
  avatar?: string | undefined;
}) => {
  try {
    const validatedData = EditProfileSchema.parse(data);

    const res = await api.patch(`/user/${id}/profile`, validatedData);

    if (avatar) {
      await api.post(`/user/${id}/profile/upload-avatar`, {
        imagePath: avatar,
      });
    }

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

    const res = await api.post("/posts/create-post", createPostData);

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const deletePostByIdAPI = async (id: string) => {
  try {
    const res = await api.delete(`/posts/delete-post/${id}`);

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getCommentsByPostWithCursorAPI = async (
  id: string,
  cursor: unknown,
) => {
  try {
    const res = await api.get(`/posts/${id}/comments`, {
      params: { cursor },
    });

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const createCommentAPI = async ({
  postId,
  authorId,
  content,
}: {
  postId: string;
  authorId: string;
  content: string;
}) => {
  try {
    const createCommentData = { authorId, postId, content };

    const res = await api.patch(
      `/posts/${postId}/create-comment`,
      createCommentData,
    );

    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const deleteCommentByIdAPI = async (id: string) => {
  try {
    const res = await api.delete(`/comments/delete-comment/${id}`);

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
