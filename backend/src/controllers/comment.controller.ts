import { Request, Response } from "express";
import { getUserByIdDb } from "../domains/user.domain";
import { createCommentOnPostDb, getPostByIdDb } from "../domains/post.domain";
import throwNewError from "../error";
import { NewCommentData } from "../types/comment.types";

export const createComment = async (req: Request, res: Response) => {
  try {
    const newCommentData: NewCommentData = req.body;

    const foundPost = await getPostByIdDb(newCommentData.postId);

    if (!foundPost) {
      throwNewError("No post found with provided ID", 404);
    }

    const foundUser = await getUserByIdDb(newCommentData.authorId);

    if (!foundUser) {
      throwNewError("No user found with provided ID", 404);
    }

    const newComment = await createCommentOnPostDb(newCommentData);

    return res.status(201).send({ comment: newComment });
  } catch (err) {
    console.log("Error creating comment:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};
