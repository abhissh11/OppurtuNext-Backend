import express from "express";
import { createPost, getPosts } from "../controllers/post-controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/getPosts", getPosts);
router.get("/getPosts/:slug", getPosts);

export default router;
