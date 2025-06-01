// server/src/routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  logout,
  getUserDetails,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", getUserDetails);

export default router;
