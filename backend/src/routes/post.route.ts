import { getAllPosts } from "../controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get("/", getAllPosts);

export default router;
