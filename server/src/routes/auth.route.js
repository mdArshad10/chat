import express from "express";
import {
  loginUser,
  signupUser,
  getUserInfo,
  logOutUser,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/auth.controller.js";
import { ProtectedUser } from "../middlewares/verify.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(ProtectedUser, logOutUser);
router.route("/user-info").get(ProtectedUser, getUserInfo);
router.route("/update-profile").put(ProtectedUser, updateProfile);
router.route("/add-profile-image").post(ProtectedUser, addProfileImage);
router.route("/remove-profile-image").delete(ProtectedUser, removeProfileImage);

export default router;
