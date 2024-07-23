import express from "express";
import {
  loginUser,
  signupUser,
  getUserInfo,
  logOutUser,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { ProtectedUser } from "../middlewares/verify.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.route('/all').get(getAllUsers);

router.route("/sign-up").post(signupUser);
router.route("/log-in").post(loginUser);
router.route("/log-out").post(ProtectedUser, logOutUser);
router.route("/user-info").get(ProtectedUser, getUserInfo);
router.route("/update-profile").put(ProtectedUser, updateProfile);
router.route("/add-profile-image").post(ProtectedUser, addProfileImage);
router.route("/remove-profile-image").delete(ProtectedUser, removeProfileImage);

export default router;
