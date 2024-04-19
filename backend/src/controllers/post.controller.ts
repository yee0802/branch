import { Request, Response } from "express";
import { getAllPostsDb } from "../domains/post.domain";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await getAllPostsDb();

  return res.status(200).send({ posts: posts });
};
