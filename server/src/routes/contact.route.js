import { Router } from "express";
import { searchContact } from "../controllers/contact.controller.js";
import { ProtectedUser } from "../middlewares/verify.js";

const router = Router();

router.route("/search").post(ProtectedUser);

export default router;
