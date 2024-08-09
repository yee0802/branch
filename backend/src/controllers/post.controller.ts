import { Request, Response } from "express";
import { getAllPostsDb, getPostBySlugDb } from "../domains/post.domain";
import throwNewError from "../error";

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
