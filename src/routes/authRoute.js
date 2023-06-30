import express from "express";
import { login, refresh, register } from "../controller/authController.js";
import jwtVerify from "../middleware/jwtVerify.js";

const router = express.Router();

// router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/refresh", jwtVerify, refresh);

export default router;
