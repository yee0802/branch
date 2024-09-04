import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { deleteCommentById } from "../controllers/comment.controller";

const router = Router();

router.delete("/delete-comment/:id", verifyToken, deleteCommentById);

export default router;
