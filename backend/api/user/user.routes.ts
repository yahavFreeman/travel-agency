import express from "express";
const router = express.Router();

import { loginUser, signupUser } from "./user.controller.js";

router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;