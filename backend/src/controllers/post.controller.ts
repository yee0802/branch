import { Request, Response } from "express";
import {
  createPostDb,
  deletePostDb,
  getAllPostsDb,
  getPostBySlugDb,
} from "../domains/post.domain";
import throwNewError from "../error";
import { NewPostData } from "../types/post.types";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await getAllPostsDb();

  return res.status(200).send({ posts: posts });
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug: string = req.params.slug;

    const post = await getPostBySlugDb(slug);

    if (!post) {
      throwNewError("No post found with provided slug.", 404);
    }

    return res.status(200).send({ post: post });
  } catch (err) {
    console.log("Error fetching post by slug:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPostData: NewPostData = req.body;

    const newPost = await createPostDb(newPostData);

    return res.status(201).send({ post: newPost });
  } catch (err) {
    console.log("Error creating post:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const deletedPost = await deletePostDb(id);

    return res.status(200).send({ post: deletedPost });
  } catch (err) {
    console.log("Error deleting post:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};
