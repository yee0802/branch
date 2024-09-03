import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostBySlug,
} from "../controllers/post.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { createComment } from "../controllers/comment.controller";

const router = Router();

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

router.post("/create-post", verifyToken, createPost);
router.delete("/delete-post/:id", verifyToken, deletePostById);

router.patch("/:id/create-comment", verifyToken, createComment);

export default router;
