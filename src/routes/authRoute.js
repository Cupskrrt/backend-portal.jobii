import express from "express";
import { register, login, refresh } from "../controller/authController.js";
import jwtVerify from "../middleware/jwtVerify.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/register", register);
router.get("/auth/refresh", jwtVerify, refresh);

export default router;
