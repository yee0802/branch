import { getAllPosts, getPostBySlug } from "../controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

export default router;
