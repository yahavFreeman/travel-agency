import express from "express";
const router = express.Router();

import { addRequest, getUserRequests } from "./vacation.controller.js";

router.post("/request", addRequest);
router.get("/request/user/:userId",getUserRequests);

export default router;