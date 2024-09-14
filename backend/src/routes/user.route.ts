import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
import {
  getUserByUsername,
  updateUserById,
  uploadUserAvatarById,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:username", verifyToken, getUserByUsername);
router.patch("/:id/profile", verifyToken, updateUserById);
router.post("/:id/profile/upload-avatar", verifyToken, uploadUserAvatarById);

export default router;
