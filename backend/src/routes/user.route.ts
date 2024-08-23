import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
import {
  getUserByUsername,
  updateUserById,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:username", verifyToken, getUserByUsername);
router.patch("/:id/profile", verifyToken, updateUserById);

export default router;
