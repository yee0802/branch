import {
  createPost,
  deletePostById,
  getAllPosts,
  getPostBySlug,
} from "../controllers/post.controller";
import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

router.post("/create-post", verifyToken, createPost);
router.delete("/delete-post/:id", verifyToken, deletePostById);

export default router;
