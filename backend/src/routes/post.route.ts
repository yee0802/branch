import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostBySlug,
  getPostsByUserId,
} from "../controllers/post.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  createComment,
  getCommentsByPostWithCursor,
} from "../controllers/comment.controller";

const router = Router();

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
router.get("/author/:id", verifyToken, getPostsByUserId);

router.post("/create-post", verifyToken, createPost);
router.delete("/delete-post/:id", verifyToken, deletePostById);

router.get("/:id/comments", getCommentsByPostWithCursor);
router.patch("/:id/create-comment", verifyToken, createComment);

export default router;
